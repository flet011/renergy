#!/usr/bin/env python3
import argparse, json, sys
from pathlib import Path
try:
    import jsonschema
except ImportError:
    print("Please `pip install jsonschema`.", file=sys.stderr); sys.exit(1)

def load(p):
    return json.loads(Path(p).read_text())

def main():
    ap = argparse.ArgumentParser(description="PKP validator/linter")
    ap.add_argument("file", help="Node JSON to validate")
    ap.add_argument("--schema", default="schema/pkp_schema_v1.json")
    ap.add_argument("--lint", action="store_true")
    args = ap.parse_args()

    schema = load(args.schema)
    data = load(args.file)

    try:
        jsonschema.validate(instance=data, schema=schema)
        print("VALID: schema compliance")
    except jsonschema.ValidationError as e:
        print("INVALID: schema error")
        print(e.message)
        sys.exit(2)

    if args.lint:
        errs = []
        for i,ps in enumerate(data.get("context",{}).get("picks_shovels",[])):
            w = ps.get("weight")
            if w is None or not (0 <= w <= 1):
                errs.append(f"picks_shovels[{i}].weight out of bounds: {w}")
        for i,a in enumerate(data.get("actions",[])):
            if "notify" not in a:
                errs.append(f"actions[{i}] missing notify")
        if errs:
            print("LINT WARNINGS:")
            for e in errs: print(" -", e)
            sys.exit(3)
        else:
            print("LINT: clean")

if __name__ == "__main__":
    main()
