# DedsiClash service namespace

Vendored from clash-verge-rev/clash-verge-service-ipc v2.7.6,
commit b2a7427d6681c8d3780ab83a73f4dc21da2f22d6 (the revision pinned by the original Cargo.lock).
The original GPL license and authors are retained.

Only application identity strings are customized: service registration, installation
paths, IPC, execution locks, and accepted core process names use DedsiClash names.
This keeps the original exclusion and ownership checks while allowing Clash Verge
to run independently. Build these sources; upstream service binaries use a different
namespace and must not be bundled with DedsiClash.
