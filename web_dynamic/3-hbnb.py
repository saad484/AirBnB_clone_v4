#!/usr/bin/python3
""" Flask Web Application for HBNB """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
import uuid

app = Flask(__name__)


@app.teardown_appcontext
def close_db(error):
    """ Closes the SQLAlchemy when the app context ends """
    storage.close()

@app.route('/3-hbnb', strict_slashes=False)
def hbnb():
    """ Endpoint for displaying HBNB information """
    # Get all states, sort them by name
    states = sorted(storage.all(State).values(), key=lambda m: m.name)
    stat_cti = []

    # For each state, create a list containing the state and its cities sorted by name
    for state in states:
        stat_cti.append([state, sorted(state.cities, key=lambda m: m.name)])

    # Get all amenities, sort them by name
    amenities = sorted(storage.all(Amenity).values(), key=lambda m: m.name)

    # Get all places, sort them by name
    places = sorted(storage.all(Place).values(), key=lambda m: m.name)

    # Render the template with the data and a unique cache_id using uuid
    return render_template('3-hbnb.html',
                           states=stat_cti,
                           amenities=amenities,
                           places=places, cache_id=uuid.uuid4())

if __name__ == "__main__":
    """ Run the app on host '0.0.0.0' and port 5000 """
    app.run(host='0.0.0.0', port=5000)
