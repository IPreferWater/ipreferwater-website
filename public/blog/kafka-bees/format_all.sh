#!/bin/bash


for file in *; do
    ext="${file##*.}"
    if [[ $ext == png ]]; then
        echo $file
		
		echo "$file" | cut -f 1 -d '.'
		#echo "${fileNoExtension}.webp"
		cwebp -q 80 $file -o "$file" | cut -f 1 -d '.'
    fi
done