import os
from pathlib import Path

# ==============================
# CONFIG
# ==============================

PROJECT_ROOT = Path(".").resolve()
OUTPUT_FILE = "context.txt"

# Các đuôi file muốn đưa vào context AI
ALLOWED_EXTENSIONS = {
    ".js", ".ts", ".jsx", ".tsx",
    ".java", ".go", ".rs",
    ".json", ".yaml", ".yml",
    ".env", ".md",
    ".html", ".css", ".scss",
    ".sql",
    ".xml"
}

# Folder cần ignore
IGNORE_DIRS = {
    ".git",
    "node_modules",
    "dist",
    "build",
    ".next",
    ".cache",
    "__pycache__",
    ".idea",
    ".vscode"
}

MAX_FILE_SIZE = 200_000  # 200KB / file


# ==============================
# BUILD TREE STRUCTURE
# ==============================

def build_tree(root: Path):
    """Tạo tree folder dạng text"""
    lines = []

    for current_path, dirs, files in os.walk(root):
        # remove ignored dirs
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

        level = Path(current_path).relative_to(root).parts
        indent = "  " * len(level)

        folder_name = root.name if current_path == str(root) else Path(current_path).name
        lines.append(f"{indent}{folder_name}/")

        subindent = "  " * (len(level) + 1)

        for f in files:
            lines.append(f"{subindent}{f}")

    return "\n".join(lines)


# ==============================
# READ FILE CONTENT
# ==============================

def is_allowed_file(file_path: Path):
    return (
        file_path.suffix.lower() in ALLOWED_EXTENSIONS
        and file_path.stat().st_size <= MAX_FILE_SIZE
    )


def read_file_safe(file_path: Path):
    try:
        return file_path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        try:
            return file_path.read_text(encoding="latin-1")
        except Exception:
            return "[UNREADABLE FILE]"
    except Exception as e:
        return f"[ERROR READING FILE: {e}]"


def collect_files(root: Path):
    collected = []

    for current_path, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

        for f in files:
            file_path = Path(current_path) / f

            if is_allowed_file(file_path):
                collected.append(file_path)

    return collected


# ==============================
# MAIN
# ==============================

def generate_context():

    project_name = PROJECT_ROOT.name

    print("🔎 Scanning project...")

    tree = build_tree(PROJECT_ROOT)
    files = collect_files(PROJECT_ROOT)

    print(f"📄 Found {len(files)} files")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as out:

        # Project name
        out.write(f"Project: {project_name}\n\n")

        # Structure
        out.write("=== PROJECT STRUCTURE ===\n")
        out.write(tree)
        out.write("\n\n")

        # Files content
        out.write("=== FILES CONTENT ===\n\n")

        for file_path in files:
            relative_path = file_path.relative_to(PROJECT_ROOT)

            print(f"Reading: {relative_path}")

            content = read_file_safe(file_path)

            out.write(f"--- FILE: {relative_path} ---\n")
            out.write(content)
            out.write("\n\n")

    print(f"\n✅ Context generated → {OUTPUT_FILE}")


if __name__ == "__main__":
    generate_context()