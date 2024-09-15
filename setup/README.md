## 1. Download and install python

Python version: 3.11

## 2. Download and install Miniforge
Download miniforge from the GitHub repository [here](https://github.com/conda-forge/miniforge).

Depending on your operating system, this should download either an .sh (macOS, Linux) or .exe file (Windows).

For the .sh file, open your command line terminal and execute the following command

```
sh ~/Desktop/Miniforge3-MacOSX-arm64.sh
```

where Desktop/ is the folder where the Miniforge installer was downloaded to. On your computer, you may have to replace it with Downloads/.

![alt text](image.png)

Next, step through the download instructions, confirming with "Enter".

If you work with many packages, Conda can be slow because of its thorough but complex dependency resolution process and the handling of large package indexes and metadata. To speed up Conda, you can use the following setting, which switches to a more efficient Rust reimplementation for solving dependencies:

```
conda config --set solver libmamba
```

## 3. Create virtual environment

```
conda create -n weather python=3.11
```

Activate the virtual environment:
```
conda activate weather
```

Deactivate:
```
conda deactivate
```

## 4. Install required Python libraries

```
pip install -r requirements.txt
```