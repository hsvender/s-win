// File: swinapp/js/table.js

$(document).ready(function() {

    let highlightedSkills = new Set();
    $.ajax({
        url: 'http://127.0.0.1:8000/swinapp/api',
        success: function(data) {
            let groupedData = new Map();


            data.forEach(function(row) {
                // Check if we've already encountered this skill
                if(groupedData.has(row.Skill)) {
                    // Get the existing entry
                    let entry = groupedData.get(row.Skill);

                    // Update the count
                    entry.Count += row.Count;

                    // Update the entry in the Map
                    groupedData.set(row.Skill, entry);
                } else {
                    // This is a new skill, so create a new entry
                    groupedData.set(row.Skill, { 
                        Skill: row.Skill, 
                        Count: row.Count, 
                        Category: row.Category
                    });
                }
            });

            // Now create a DataTable using the grouped data
            let table = $('#dataTable').DataTable({
                data: Array.from(groupedData.values()),
                order: [[ 1, "desc" ]],
                columns: [
                    { data: 'Skill' },
                    { data: 'Count' },
                    { data: 'Category' },
                    {
                        data: null,
                        className: "center",
                        defaultContent: '<input type="checkbox" class="highlight">'
                    }
                ],
                initComplete: function () {
                    this.api().columns(2).every( function () {
                        var column = this;
                        var select = $('<select><option value="">All</option></select>')
                            .appendTo( $(column.header()).empty() )
                            .on( 'change', function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val()
                                );

                                column
                                    .search( val ? '^'+val+'$' : '', true, false )
                                    .draw();
                            } );

                        column.data().unique().sort().each( function ( d, j ) {
                            select.append( '<option value="'+d+'">'+d+'</option>' )
                        } );
                    } );
                }
            });

            $('#dataTable').on('change', 'input.highlight', function() {
                let data = table.row($(this).parents('tr')).data();

                if ($(this).is(":checked")) {
                    highlightedSkills.add(data.Skill);
                } else {
                    highlightedSkills.delete(data.Skill);
                }

                updateLineChart(Array.from(highlightedSkills));
                
                // If there are no skills selected, default to 'All'
                if (highlightedSkills.size === 0) {
                    updateChart(['All']);
                } else {
                    updateChart(Array.from(highlightedSkills));
                }
            });
        }
    });
});
