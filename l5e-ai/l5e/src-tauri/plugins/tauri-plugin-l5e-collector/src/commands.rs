use tauri::{AppHandle, command, Runtime};

use crate::models::*;
use crate::Result;
use crate::L5eCollectorExt;

#[command]
pub(crate) async fn ping<R: Runtime>(
    app: AppHandle<R>,
    payload: PingRequest,
) -> Result<PingResponse> {
    app.l5e_collector().ping(payload)
}
