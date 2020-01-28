function getWidthandHeight(obj, m){
	let width = +obj.attr("width") - m.left - m.right;
	let height = +obj.attr("height") - m.top - m.bottom;
	return { width, height }
}

function appendToParent(parent, type, className, transformation){
    return parent.append(type)
        .attrs({
            "class": className, 
            "transform": transformation
        });
      
}

function buildButtons(srcData, parentID){
    let parent = d3.select(`#${parentID}`)
    let dataJoin = parent
        .selectAll('g')
        .data(srcData);
        dataJoin.join(enterRadio, updateRadio)
}

function enterRadio(enterSelection) {
    let groups = enterSelection.append('g')
    .attr('class', 'buttonG')

    groups.append('input')
    .attrs({
        'type': 'radio',
        'value': d => d.State,
        'class': 'stateRadio',
        'checked': d => (d.checked == true) ? true : null,
        'name': 'selectedState'
    })

    groups.append('text')
        .text(d => d.State)
}

function updateRadio(updateSelection) {
    updateSelection.select('.stateRadio')
        .call(u => u.transition().duration(0)
        .attr('checked', d => {
            return (d.checked == ture) ? true : null
        }))
    }


function updateSelectedState(e) {
    // update the selected state status in our data
    justStates = justStates.map(d => {
        d.checked = false;

        if(d.State == e.State) {

        }
        return d
    })

    // update buttons
    buildButtons(justStates, 'buttonWrapper')

    // updated selected data
    let selectedData = rootData.filter(d => d.State == justStates.filter())
}