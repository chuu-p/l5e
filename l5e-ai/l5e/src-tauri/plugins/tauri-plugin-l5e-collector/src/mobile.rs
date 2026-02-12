use serde::de::DeserializeOwned;
use tauri::{
  plugin::{PluginApi, PluginHandle},
  AppHandle, Runtime,
};

use crate::models::*;

#[cfg(target_os = "ios")]
tauri::ios_plugin_binding!(init_plugin_l5e_collector);

// initializes the Kotlin or Swift plugin classes
pub fn init<R: Runtime, C: DeserializeOwned>(
  _app: &AppHandle<R>,
  api: PluginApi<R, C>,
) -> crate::Result<L5eCollector<R>> {
  #[cfg(target_os = "android")]
  let handle = api.register_android_plugin("dev.chuu.l5e.collector", "L5eCollectorPlugin")?;
  #[cfg(target_os = "ios")]
  let handle = api.register_ios_plugin(init_plugin_l5e_collector)?;
  Ok(L5eCollector(handle))
}

/// Access to the l5e-collector APIs.
pub struct L5eCollector<R: Runtime>(PluginHandle<R>);

impl<R: Runtime> L5eCollector<R> {
  pub fn ping(&self, payload: PingRequest) -> crate::Result<PingResponse> {
    self
      .0
      .run_mobile_plugin("ping", payload)
      .map_err(Into::into)
  }
}
