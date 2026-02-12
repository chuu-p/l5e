// Learn more about Tauri commands at https://v2.tauri.app/develop/calling-rust/#commands
#[tauri::command]
fn ping(value: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![ping])
        .plugin(tauri_plugin_l5e_collector::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
