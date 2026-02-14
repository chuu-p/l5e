use tauri::{
    plugin::{Builder, TauriPlugin},
    Manager, Runtime,
};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
pub mod models;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::L5eCollector;
#[cfg(mobile)]
use mobile::L5eCollector;

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the l5e-collector APIs.
pub trait L5eCollectorExt<R: Runtime> {
    fn l5e_collector(&self) -> &L5eCollector<R>;
}

impl<R: Runtime, T: Manager<R>> crate::L5eCollectorExt<R> for T {
    fn l5e_collector(&self) -> &L5eCollector<R> {
        self.state::<L5eCollector<R>>().inner()
    }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("l5e-collector")
        .invoke_handler(tauri::generate_handler![
            commands::ping,
            commands::check_permissions,
            commands::request_permissions
        ])
        .setup(|app, api| {
            #[cfg(mobile)]
            let l5e_collector = mobile::init(app, api)?;
            #[cfg(desktop)]
            let l5e_collector = desktop::init(app, api)?;
            app.manage(l5e_collector);
            Ok(())
        })
        .build()
}
