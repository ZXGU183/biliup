import React, { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { fetcher } from '@/app/lib/api-streamer'
import { Notification, Spin, Typography } from '@douyinfe/semi-ui'

type QrcodeProps = {
  onSuccess: (e: string) => void
}

const Qrcode: React.FC<QrcodeProps> = ({ onSuccess }) => {
  const [url, setUrl] = useState('')
  const [qrData, setQrData] = useState<any>(null)
  useEffect(() => {
    // Create an instance.
    const controller = new AbortController()
    const signal = controller.signal
    // Register a listenr.
    signal.addEventListener('abort', () => {
      console.log('aborted!')
    })
    ;(async () => {
      const initialQrData = await fetcher('/v1/get_qrcode', undefined)
      setUrl(initialQrData['data']['url'])
      setQrData(initialQrData)
      console.log(initialQrData['data']['url'])

      const poll = async () => {
        if (signal.aborted) return

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER ?? ''}/v1/login_by_qrcode`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(initialQrData),
            signal: signal,
          })

          if (res.status === 200) {
            const data = await res.json()
            onSuccess(data['filename']) // Call onSuccess to add user to the list
            return // Stop polling on success
          }

          // If not successful, continue polling
          setTimeout(poll, 2000) // Poll every 2 seconds
        } catch (e: any) {
          if (e.name !== 'AbortError') {
            throw e
          }
        }
      }
      await poll()
    })().catch(e => {
      console.log(e)
      Notification.error({
        title: 'QRcode',
        content: <Typography.Paragraph style={{ maxWidth: 450 }}>{e.message}</Typography.Paragraph>,
        style: { width: 'min-content' },
      })
    })

    return () => {
      controller.abort('qrcode exit')
    }
  }, [onSuccess]) // No dependency on qrData to avoid re-triggering
  if (url === '') {
    return <Spin />
  }
  return (
    <div
      style={{
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'max-content',
      }}
    >
      <QRCodeSVG value={url} />
    </div>
  )
}

export default Qrcode
