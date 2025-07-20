fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 在构建时自动检测目标平台并通知 Tauri。
    // 这会使 Tauri 自动包含正确的 sidecar 二进制文件，
    // 解决了 MSVC 和 GNU 工具链之间的文件名差异问题。
    tauri_build::try_build(tauri_build::Attributes::new().codegen(tauri_build::CodegenContext::new()))?;
    Ok(())
}
