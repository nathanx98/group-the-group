# from keys import AIzaSyCm0ZhqcDDR75EnTs4EfSxFIdFIdowigCs #replace this with your own API key!
import networkx as nx
import numpy as np
import osmnx as ox

api_key = "AIzaSyCm0ZhqcDDR75EnTs4EfSxFIdFIdowigCs"

# place_name = "Amherst,Massachusetts,USA"
# graph = ox.graph_from_place(place_name)
# fig,ax = ox.plot_graph(graph)

place = 'Amherst'
place_query = {'city':'Amherst', 'state':'Massachusetts', 'country':'USA'}
G = ox.graph_from_place(place_query, network_type='drive')


G = ox.add_node_elevations(G, api_key=api_key)
G = ox.add_edge_grades(G)

def findRoute(graph,start,end, eWeight, dWeight):
    
