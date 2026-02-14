use serde::{Deserialize, Serialize};
use specta::Type;
use tauri::plugin::PermissionState;

#[derive(Debug, Clone, Default, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct PermissionStatus {
    pub abc: PermissionState,
}

#[derive(Debug, Clone, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum PermissionType {
    Abc,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PingRequest {
    pub value: Option<String>,
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PingResponse {
    pub value: Option<String>,
}
