#!/usr/bin/env python3

# IMPORTS
from flask import request, render_template, session, abort
from flask_restful import Resource
from dotenv import load_dotenv
from sqlalchemy.exc import IntegrityError
import traceback

load_dotenv()

# Local imports
from config import socket_io, app, db, api, os


@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")