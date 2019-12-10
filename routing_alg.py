# from keys import AIzaSyCm0ZhqcDDR75EnTs4EfSxFIdFIdowigCs #replace this with your own API key!
import networkx as nx
import numpy as np
import osmnx as ox
from flask import Flask, render_template, redirect, url_for,request
from flask import make_response,jsonify
app = Flask(__name__)

#https://github.com/gboeing/osmnx-examples/blob/master/notebooks/12-node-elevations-edge-grades.ipynb

api_key = "AIzaSyCm0ZhqcDDR75EnTs4EfSxFIdFIdowigCs"

place = 'Amherst'
place_query = {'city':'Amherst', 'state':'Massachusetts', 'country':'USA'}
G = ox.graph_from_place(place_query, network_type='drive')
G = ox.add_node_elevations(G, api_key=api_key)
G = ox.add_edge_grades(G)
G = ox.add_edge_lengths(G)
G_proj = ox.project_graph(G)


@app.route('/')
def webprint():
    return render_template('map_test.html')

@app.route('/route', methods=['GET', 'POST'])
def route():
    route = getRoute((float(request.form['start']), float(request.form['start2'])),(float(request.form['end']),float(request.form['end2'])),float(request.form['distance']),float(request.form['elevation']))
    gdf = ox.graph_to_gdfs(G, edges=False)
    gdf = gdf[['osmid','x','y']]
    l = []
    for x in route:
        data = gdf.loc[gdf['osmid']==x].values.tolist()
        l.append((data[0][1],data[0][2]))
    return jsonify(l)
def getRoute(start, end, dWeight, eWeight):
    origin = ox.get_nearest_node(G, start)
    destination = ox.get_nearest_node(G, end)
    #bbox = ox.bbox_from_point(start, distance=6000, project_utm=True)

    for u, v, k, data in G_proj.edges(keys=True, data=True):
        data['rise'] = data['length'] * data['grade']
        data['impedance'] = data['length']*dWeight + abs(data['rise']*eWeight)
    # if dWeight > eWeight:
    #     return nx.shortest_path(G, source=origin, target=destination, weight='length')
    # else:
    #     return nx.shortest_path(G, source=origin, target=destination, weight='rise')
    return nx.shortest_path(G_proj, source=origin, target=destination, weight='impedance')

if __name__ == "__main__":
    app.run(debug = True)
