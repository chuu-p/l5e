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
                Manifest.permission.health.READ_HEART_RATE,
                Manifest.permission.health.WRITE_HEART_RATE,
                Manifest.permission.health.READ_STEPS,
                Manifest.permission.health.WRITE_STEPS,
                Manifest.permission.health.READ_EXERCISE,
                Manifest.permission.health.WRITE_EXERCISE,
                Manifest.permission.health.READ_SLEEP,
                Manifest.permission.health.WRITE_SLEEP,
                Manifest.permission.health.READ_SPEED,
                Manifest.permission.health.WRITE_SPEED,
                Manifest.permission.health.READ_DISTANCE,
                Manifest.permission.health.WRITE_DISTANCE,
                Manifest.permission.health.READ_TOTAL_CALORIES_BURNED,
                Manifest.permission.health.WRITE_TOTAL_CALORIES_BURNED,
                Manifest.permission.health.READ_WEIGHT,
                Manifest.permission.health.WRITE_WEIGHT,
                Manifest.permission.health.READ_HEALTH_DATA_IN_BACKGROUND,
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
