import path from "node:path"
import upath from "upath"
import resolveUserDataPath from "./utils/resolveUserDataPath"

const isWin = process.platform.includes("win")
const isMac = process.platform.includes("darwin")

const runtimeName = "rs-relic"

const userdata_path = resolveUserDataPath()
const runtime_path = upath.normalizeSafe(path.join(userdata_path, runtimeName))
const cache_path = upath.normalizeSafe(path.join(runtime_path, "cache"))
const packages_path = upath.normalizeSafe(path.join(runtime_path, "packages"))
const binaries_path = upath.normalizeSafe(path.resolve(runtime_path, "binaries"))
const db_path = upath.normalizeSafe(path.resolve(runtime_path, "db.json"))

const binaries = {
    sevenzip_bin: upath.normalizeSafe(path.resolve(binaries_path, "7z-bin", isWin ? "7za.exe" : "7za")),
    git_bin: upath.normalizeSafe(path.resolve(binaries_path, "git-bin", "bin", isWin ? "git.exe" : "git")),
    rclone_bin: upath.normalizeSafe(path.resolve(binaries_path, "rclone-bin", isWin ? "rclone.exe" : "rclone")),
    java22_jre_bin: upath.normalizeSafe(path.resolve(binaries_path, "java22_jre_bin", (isMac ? "Contents/Home/bin/java" : (isWin ? "bin/java.exe" : "bin/java")))),
    java17_jre_bin: upath.normalizeSafe(path.resolve(binaries_path, "java17_jre_bin", (isMac ? "Contents/Home/bin/java" : (isWin ? "bin/java.exe" : "bin/java")))),
}

export default {
    runtimeName,
    db_path,
    userdata_path,
    runtime_path,
    cache_path,
    packages_path,
    binaries_path,
    ...binaries,
}