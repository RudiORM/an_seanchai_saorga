<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  // Props

  let {nodes,edges} = $props();

  const width = 400;
  const height = 400;
  
  // State variables
  let svg = $state(null);
  let container = $state(null);
  
  // Derived state
  let radius = $derived(Math.min(width, height) * 0.25);
  
  // Initialize the diagram when component mounts and when data changes
  const initialize = $derived.by(() => {
    if (container && nodes.length > 0 && edges.length > 0) {
      renderDiagram();
    }
  });
  
  // Function to render the diagram
  function renderDiagram() {
    // Clear previous SVG
    d3.select(container).select('svg').remove();
    
    // Create SVG
    svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`);

 const colorScale = d3.scaleOrdinal()
  .domain(nodes.map(d => d.group))
  .range([
    '#5c3117', // Default color
    '#243E36', // Light color for group 1
    '#6E633D', // Light color for group 2
    '#6E633D', // Light color for group 3
  ]);


    
    // Group nodes by their group property
    const nodesByGroup = d3.group(nodes, d => d.group);
    
    // Calculate positions for each node in a radial layout
    const groups = Array.from(nodesByGroup.keys());
    const groupAngles = {};
    
    // Assign angles to each group
    groups.forEach((group, i) => {
      groupAngles[group] = (i / groups.length) * 2 * Math.PI;
    });
    
    nodes.forEach((node, index) => {
  // Calculate angle for even distribution around the circle
  const angle = (2 * Math.PI * index) / nodes.length;
  
  // Set x and y based on angle and radius
  node.x = Math.cos(angle) * radius;
  node.y = Math.sin(angle) * radius;
  
  // Size nodes based on count with min/max constraints
  const minRadius = 3;
  const maxRadius = 14;
  const maxCount = Math.max(...nodes.map(n => n.count || 1));
  node.radius = node.count 
    ? minRadius + (node.count / maxCount) * (maxRadius - minRadius)
    : minRadius;
});
    
    // Draw edges
    const linkOpacity = 0.1;
    svg.selectAll('.link')
      .data(edges)
      .enter()
      .append('line')
      .attr('class', 'link')
     .attr('x1', d => {
  const source = nodes[d.source]; // Use numeric index directly instead of find()
  return source ? source.x : 0;
})
.attr('y1', d => {
  const source = nodes[d.source]; // Use numeric index directly instead of find()
  return source ? source.y : 0;
})
.attr('x2', d => {
  const target = nodes[d.target]; // Use numeric index directly instead of find()
  return target ? target.x : 0;
})
.attr('y2', d => {
  const target = nodes[d.target]; // Use numeric index directly instead of find()
  return target ? target.y : 0;
})
      .attr('stroke', '#5c3117')
      .attr('stroke-opacity', 0)
      .attr('stroke-width', d =>  1);
    
    // Draw nodes
    const nodeGroups = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);
    
    // Add circles for nodes
    nodeGroups.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => colorScale(d.group))
      .attr('stroke', '#fff')
      .attr('stroke-width', 0)
   
    
    // Add labels
    nodeGroups.append('text')
      .attr('dx', d => (d.x > 0 ? d.radius + 3 : -(d.radius + 3)))
      .attr('dy', '0.3em')
      .attr('text-anchor', d => d.x > 0 ? 'start' : 'end')
      .attr('font-size', '12px')
      .attr('font-family', 'Eagle Lake, sans-serif')
      .attr('fill', d => {
        // Get a color based on the group
    
        return '#5c3117';
      })
      .text(d => d.Label_short)
      .attr('transform', d => {
        // Rotate text based on its position in the circle
        const angle = Math.atan2(d.y, d.x) * 180 / Math.PI;
        let textRotation = angle;
        
        // Adjust rotation so text is always readable
        if (angle > 90 || angle < -90) {
          textRotation += 180;
        }
        
        return `rotate(${textRotation}, 0, 0)`;
      });
  }
  
  onMount(() => {
    // Initial render
    if (nodes.length > 0 && edges.length > 0) {
      renderDiagram();
    }
  });
</script>

<div bind:this={container} style="width: {width}px; height: {height}px;" class="radial-network-container">
  <!-- D3 will add SVG here -->
</div>

<style>
  .radial-network-container {
    position: relative;
  }
  
  :global(.link) {
    pointer-events: none;
  }
  
  :global(.node circle) {
    cursor: pointer;
  }
  
  :global(.node text) {
    pointer-events: none;
    user-select: none;
  }
</style>