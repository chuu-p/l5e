package dev.chuu.l5e.collector

import android.Manifest
import android.app.Activity
import app.tauri.annotation.Command
import app.tauri.annotation.InvokeArg
import app.tauri.annotation.TauriPlugin
import app.tauri.plugin.Invoke
import app.tauri.plugin.JSObject
import app.tauri.plugin.Plugin
import app.tauri.annotation.Permission

@InvokeArg
class PingArgs {
    var value: String? = null
}

@TauriPlugin(
    permissions = [
        Permission(
            strings = [
                "android.permission.health.READ_HEART_RATE",
                "android.permission.health.WRITE_HEART_RATE",
                "android.permission.health.READ_STEPS",
                "android.permission.health.WRITE_STEPS",
                "android.permission.health.READ_EXERCISE",
                "android.permission.health.WRITE_EXERCISE",
                "android.permission.health.READ_SLEEP",
                "android.permission.health.WRITE_SLEEP",
                "android.permission.health.READ_SPEED",
                "android.permission.health.WRITE_SPEED",
                "android.permission.health.READ_DISTANCE",
                "android.permission.health.WRITE_DISTANCE",
                "android.permission.health.READ_TOTAL_CALORIES_BURNED",
                "android.permission.health.WRITE_TOTAL_CALORIES_BURNED",
                "android.permission.health.READ_WEIGHT",
                "android.permission.health.WRITE_WEIGHT",
                "android.permission.health.READ_HEALTH_DATA_IN_BACKGROUND",
            ],
            alias = "abc",
        ),
    ],
)
class L5eCollectorPlugin(
    private val activity: Activity,
) : Plugin(activity) {
    @Command
    fun ping(invoke: Invoke) {
        val args = invoke.parseArgs(PingArgs::class.java)

        val ret = JSObject()
        ret.put("value", "Hello, " + args.value + " from Kotlin!")
        invoke.resolve(ret)
    }
}
