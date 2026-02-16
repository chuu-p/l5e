#[tauri::command]
fn test_request_abc_permission(
        app_handle: tauri::AppHandle
    ) -> bool {
    use tauri::plugin::PermissionState;
    use tauri_plugin_l5e_collector::models::PermissionType;
    use tauri_plugin_l5e_collector::L5eCollectorExt;

    let res = app_handle
        .l5e_collector()
        .check_permissions()
        .expect("Failed to request read audio permission");
    if res.abc != PermissionState::Granted {
        return app_handle
            .l5e_collector()
            .request_permissions(Some(vec![PermissionType::Abc]))
            .unwrap()
            .abc
            == PermissionState::Granted;
    }
    true
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn ping(value: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", value)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_l5e_collector::init())
        .invoke_handler(tauri::generate_handler![ping, test_request_abc_permission])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
