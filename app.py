import os
import sys
import importlib.util

BACKEND_DIR = os.path.join(
    os.path.dirname(__file__),
    "Backend"
)

sys.path.insert(0, BACKEND_DIR)

backend_app_path = os.path.join(
    BACKEND_DIR,
    "app.py"
)

spec = importlib.util.spec_from_file_location(
    "backend_app",
    backend_app_path
)

backend_app = importlib.util.module_from_spec(spec)

spec.loader.exec_module(backend_app)

app = backend_app.app