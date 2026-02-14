use serde::de::DeserializeOwned;
use tauri::{plugin::PluginApi, AppHandle, Runtime};

use crate::models::*;

pub fn init<R: Runtime, C: DeserializeOwned>(
    app: &AppHandle<R>,
    _api: PluginApi<R, C>,
) -> crate::Result<L5eCollector<R>> {
    Ok(L5eCollector(app.clone()))
}

/// Access to the l5e-collector APIs.
pub struct L5eCollector<R: Runtime>(AppHandle<R>);

impl<R: Runtime> L5eCollector<R> {
    pub fn ping(&self, payload: PingRequest) -> crate::Result<PingResponse> {
        Ok(PingResponse {
            value: payload.value,
        })
    }
}
