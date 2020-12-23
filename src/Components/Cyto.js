import React, { Component } from 'react';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';

Cytoscape.use(COSEBilkent);

class Cyto extends Component {
    constructor() {
        super();

        this.state = {
        };
    }
    render() {
        const cytoElements = [
            { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
            { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
            { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
        ];

        

        let edges=[
            ["[source_0-0]", "some effects", "Describe","Describe some effects and applications of expansion and contraction in everyday life","Describe some effects and applications of expansion and contraction in everyday life"], 
            ["[source_0-0]", "applications", "Describe","Describe some effects and applications of expansion and contraction in everyday life"],
            ["[source_1-0]", "[target_1-0_from_State]", "State","State the S.I. unit of temperature and use the appropriate unit for it","State the S.I. unit of temperature and use the appropriate unit for it"],
            ["[source_1-0]", "the appropriate unit", "use","State the S.I. unit of temperature and use the appropriate unit for it","State the S.I. unit of temperature and use the appropriate unit for it"]
        ]

        let uniqNodes = {}
        let uniqEdges = []
        let cytoElement = []
        let baseGraphNodes=[]

        edges.forEach(edge=>{
            let u = edge[0]
            let v = edge[1]
            if (!(baseGraphNodes.includes(u))) {
                baseGraphNodes.push(u)
            }
            if (!(baseGraphNodes.includes(v))) {
                baseGraphNodes.push(v)
            }
            let time = edge[3]
            if (!(u in uniqNodes) || Date.parse(uniqNodes[u]) > Date.parse(time))
                uniqNodes[u] = {time: time, unixTime: Date.parse(time)};
            if (!(v in uniqNodes) || Date.parse(uniqNodes[v]) > Date.parse(time)) 
                uniqNodes[v] = {time: time, unixTime: Date.parse(time)};

            if (uniqEdges.includes(edge)) return;

            uniqEdges.push(edge)
        });

        for (const[key, val] of Object.entries(uniqNodes)) {
            let element = {
                data: {id: key, label:key, created: val.time, content: `${key}\n\n${val.time.split(',')[0]}`, unixTime: val.unixTime}
            }
            if (baseGraphNodes.includes(key)) {
                element.data['inBaseGraph'] = true    
            }
            cytoElement.push(element)
        }

        uniqEdges.forEach((edge)=>{
            var u = edge[0]
            var v = edge[1]
            var relationship = edge[2]
            cytoElement.push({data: {id: `${u}-to-${v}`, source: u, target: v, weight: relationship}})
        });
        console.log("cytoElement",cytoElement);
        let element = cytoElement;

        var cytolayout = {
            name: 'cose-bilkent',
            quality: 'default',
            // Whether to include labels in node dimensions. Useful for avoiding label overlap
            nodeDimensionsIncludeLabels: true,
            // number of ticks per frame; higher is faster but more jerky
            refresh: 30,
            // Whether to fit the network view after when done
            fit: true,
            // Padding on fit
            padding: 10,
            // Whether to enable incremental mode
            randomize: true,
            // Node repulsion (non overlapping) multiplier
            nodeRepulsion: 80,
            // Ideal (intra-graph) edge length
            idealEdgeLength: 80,
            // Divisor to compute edge forces
            edgeElasticity: 0.8,
            // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
            nestingFactor: 10,
            // Gravity force (constant)
            gravity: 0.8,
            // Maximum number of iterations to perform
            numIter: 2500,
            // Whether to tile disconnected nodes
            tile: true,
            // Type of layout animation. The option set is {'during', 'end', false}
            animate: true,
            // Duration for animate:end
            animationDuration: 500,
            // Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
            tilingPaddingVertical: 10,
            // Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
            tilingPaddingHorizontal: 20,
            // Gravity range (constant) for compounds
            gravityRangeCompound: 1.7,
            // Gravity force (constant) for compounds
            gravityCompound: 1.0,
            // Gravity range (constant)
            gravityRange: 1.4,
            // Initial cooling factor for incremental layout
            initialEnergyOnIncremental: 0.5
        }

        const layout = {
            name: 'cose-bilkent',
            ready: function(){},
            stop: function(){},
            animate: true,
            animationEasing: undefined,
            animationDuration: undefined,
            animateFilter: function ( node, i ){ return true; },
            animationThreshold: 250,
            refresh: 30,
            fit: true,
            padding: 10,
            boundingBox: undefined,
            nodeDimensionsIncludeLabels: true,
            randomize: true,
            componentSpacing: 40,
            nodeRepulsion: function( node ){ return 80; },
            nodeOverlap: 4,
            edgeElasticity: function( edge ){ return 0.8; },
            nestingFactor: 10,
            gravity: 1,
            numIter: 1000,
            initialTemp: 1000,
            coolingFactor: 0.99,
            minTemp: 1.0,
            idealEdgeLength: 80,
        };
        return (
            <div>Cyto works
            <CytoscapeComponent
                elements = {element}
                style={ { width: '600px', height: '600px' } }
                />
            </div>
        );
    }
}

export default Cyto;