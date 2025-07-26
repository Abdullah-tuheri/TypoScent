#!/usr/bin/env python3
import os
import re

# Recursively find all .liquid files
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.liquid'):
            liquid_path = os.path.join(root, file)
            twig_path = os.path.join(root, file[:-7] + '.twig')

            with open(liquid_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Basic replacements
            # translation filter
            content = re.sub(r"\|\s*t\b", "|trans", content)

            # layout directive -> extends
            content = re.sub(r"{%\s*layout\s+'(.*?)'\s*%}", r"{% extends '\1.twig' %}", content)

            # section directive -> include for twig
            content = re.sub(r"{%\s*section\s+'(.*?)'\s*%}", r"{% include '\1.twig' %}", content)

            # for loops with limit -> slice filter
            def replace_for(match):
                var = match.group(1)
                collection = match.group(2)
                limit = match.group(3)
                if limit:
                    return f"{% for {var} in {collection} | slice(0, {limit}) %}"
                return match.group(0)

            content = re.sub(r"{%\s*for\s+(\w+)\s+in\s+([^\s]+)(?:\s+limit:(\d+))?\s*%}", replace_for, content)

            # Write to twig file
            with open(twig_path, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"Converted {liquid_path} -> {twig_path}")

