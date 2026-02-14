use tauri::{command, AppHandle, Runtime};

use crate::models::*;
use crate::L5eCollectorExt;
use crate::Result;

#[cfg(mobile)]
#[tauri::command]
#[specta::specta]
pub(crate) async fn check_permissions<R: Runtime>(app: AppHandle<R>) -> Result<PermissionStatus> {
    app.l5e_collector().check_permissions()
}

#[cfg(mobile)]
#[tauri::command]
#[specta::specta]
pub(crate) async fn request_permissions<R: Runtime>(
    app: AppHandle<R>,
    permissions: Option<Vec<PermissionType>>,
) -> Result<PermissionStatus> {
    app.l5e_collector().request_permissions(permissions)
}

#[command]
pub(crate) async fn ping<R: Runtime>(
    app: AppHandle<R>,
    payload: PingRequest,
) -> Result<PingResponse> {
    app.l5e_collector().ping(payload)
}
