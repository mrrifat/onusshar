#!/usr/bin/env python3

from setuptools import setup, find_packages

setup(
    name='ibus-onusshar',
    version='0.3.0',
    description='Onusshar Bengali Phonetic Keyboard for IBus',
    author='Onusshar Contributors',
    author_email='',
    url='https://github.com/onusshar/onusshar',
    license='MIT',
    packages=find_packages(),
    install_requires=[
        'pygobject>=3.40',
    ],
    scripts=[
        'bin/ibus-engine-onusshar',
    ],
    data_files=[
        ('share/ibus/component', ['data/onusshar.xml']),
        ('share/icons', ['data/onusshar.svg']),
    ],
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: End Users/Desktop',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10',
        'Programming Language :: Python :: 3.11',
        'Topic :: System :: Input Methods',
    ],
    python_requires='>=3.8',
)
