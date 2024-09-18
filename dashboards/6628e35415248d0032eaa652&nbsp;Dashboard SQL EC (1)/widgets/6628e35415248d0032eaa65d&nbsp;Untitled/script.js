/*
Welcome to your Widget's Script.

To learn how you can access the Widget and Dashboard objects, see the online documentation at https://sisense.dev/guides/js/extensions
*/

var yourFilterTitle = "Date";

function formatDate(dateString, granularity) {
    const date = new Date(dateString);
    switch (granularity) {
        case 'years':
            return date.getFullYear().toString();
        case 'quarters':
            return `Q${Math.floor((date.getMonth() + 3) / 3)} ${date.getFullYear()}`;
        case 'months':
            return `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        case 'weeks':
            return `${getISOWeek(date)} ${date.getFullYear()}`;
        default:
            return date.toISOString().slice(0,10);
    }
}

function getISOWeek(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysDifference = (date - firstDayOfYear) / (24 * 60 * 60 * 1000);
    return Math.ceil((daysDifference + firstDayOfYear.getDay() + 1) / 7);
}


widget.on("ready", function(w, args) {
    var filterjaql;
    prism.activeDashboard.filters.$$items.forEach((itemFilter) => {
        if ((itemFilter.isCascading === true) ? itemFilter.levels.some(level => level.title === yourFilterTitle) : (itemFilter.jaql.title === yourFilterTitle)) {
            filterjaql = itemFilter.isCascading ? itemFilter.levels.find(level => level.title === yourFilterTitle).filter : itemFilter.jaql;
        }
    });

    if (filterjaql) {
        if (filterjaql.filter.all) {
            $("#text-to-change").text("Date Range selected: All");
        } else {
            let text = "Date Range selected: ";
            if (filterjaql.filter.members) {
                text += filterjaql.level + ": " + filterjaql.filter.members.map(dateString => formatDate(dateString, filterjaql.level)).join(", ");
            } else if (filterjaql.filter.exclude) {
                text += filterjaql.level + ": NOT " + filterjaql.filter.exclude.members.map(dateString => formatDate(dateString, filterjaql.level)).join(", ");
            } else if (filterjaql.filter.from && filterjaql.filter.to) {
                text += "from " + formatDate(filterjaql.filter.from, filterjaql.level) + " to " + formatDate(filterjaql.filter.to, filterjaql.level);
            } else if (filterjaql.filter.from) {
                text += "from " + formatDate(filterjaql.filter.from, filterjaql.level);
            } else if (filterjaql.filter.to) {
                text += "to " + formatDate(filterjaql.filter.to, filterjaql.level);
            } else if (filterjaql.filter.last) {
                text += "Last " + filterjaql.filter.last.count + " " + filterjaql.level;
                if (filterjaql.filter.last.anchor) {
                    text += ", Before: " + formatDate(filterjaql.filter.last.anchor, 'days');
                }
                if (filterjaql.filter.last.offset === 0) {
                    text += ", Including current";
                } else {
                    text += ", offset " + (filterjaql.filter.last.offset || 0) + " " + filterjaql.level;
                }
            } else if (filterjaql.filter.next) {
                text += "Next " + filterjaql.filter.next.count + " " + filterjaql.level;
                if (filterjaql.filter.next.anchor) {
                    text += ", After: " + formatDate(filterjaql.filter.next.anchor, 'days');
                }
                if (filterjaql.filter.next.offset === 0) {
                    text += ", Including current";
                } else {
                    text += ", offset " + (filterjaql.filter.next.offset || 0) + " " + filterjaql.level;
                }
            } else if (filterjaql.filter.top) {
                text += "Top " + filterjaql.filter.top + " " + filterjaql.level + ", ranked by " + filterjaql.filter.rankingMessage;
            } else if (filterjaql.filter.bottom) {
                text += "Bottom " + filterjaql.filter.bottom + " " + filterjaql.level + ", ranked by " + filterjaql.filter.rankingMessage;
            }
            $("#text-to-change").text(text);
        }
    }
});


/*

var yourFilterTitle = "Date";

function extractYearFromDate(dateString) {
    return dateString.substring(0, 4); 
}

function formatQuarterFromDate(dateString) {
    const [year, month] = dateString.split('-').map(Number);
    const quarter = Math.floor((month - 1) / 3) + 1;
    return `Q${quarter} ${year}`;
}

function formatMonthFromDate(dateString) {
    const [year, month] = dateString.split('-').map(Number);
    return `${String(month).padStart(2, '0')}/${year}`;
}

function formatWeekFromDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const weekNumber = getISOWeek(date);
    return `${weekNumber} ${year}`;
}

function formatISOWeekFromDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 4 - (newDate.getDay() || 7));
    const yearStart = new Date(newDate.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((((newDate - yearStart) / 86400000) + 1) / 7);
    return `${weekNumber} ${year}`;
}

function formatDateFromDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}




widget.on("ready", function(w, args) {
    var filterjaql;

    prism.activeDashboard.filters.$$items.forEach((itemFilter) => {
        if (itemFilter.isCascading === true) {
            for (var k = 0; k < itemFilter.levels.length; k++) {
                if (itemFilter.levels[k].title === yourFilterTitle) {
                    filterjaql = itemFilter.levels[k].filter;
                }
            }
        } else { 
            if (itemFilter.jaql.title === yourFilterTitle) {
                filterjaql = itemFilter.jaql;
            }
        }
    });
//debugger

        if (filterjaql.filter.all && filterjaql.filter.all === true) {
        $("#text-to-change").text("Date Range selected: All");
        }
               
        else if (filterjaql.level === 'years') {
                if (filterjaql.filter.members) {
                        var years = filterjaql.filter.members.map(function(dateString) {
                                return extractYearFromDate(dateString);
                        });
                        $("#text-to-change").text("Date Range selected (years): " + years.join(", "));
                }
                else if (filterjaql.filter.exclude) {
                        var years = filterjaql.filter.exclude.members.map(function(dateString) {
                                return extractYearFromDate(dateString);
                        });
                        $("#text-to-change").text("Date Range selected (years): NOT " + years.join(", "));
                }
                else if (filterjaql.filter.last) { 
                        if (filterjaql.filter.last.anchor) {
                                var last = filterjaql.filter.last.count;
                                var offset = filterjaql.filter.last.offset;
                                var anchor = formatDateFromDate(filterjaql.filter.last.anchor);
                                $("#text-to-change").text("Date Range selected: Within " + last + " years, before: " + anchor + ", offset: " + offset);
                        }
                        else if (filterjaql.filter.last.offset === 0) {
                                var last = filterjaql.filter.last.count;
                                $("#text-to-change").text("Date Range selected: Last " + last + " years, Including current" );
                        }
                        else {
                                var last = filterjaql.filter.last.count;
                                var offset = filterjaql.filter.last.offset;
                                $("#text-to-change").text("Date Range selected: Last " + last + " years, offset " + offset + " years" );
                        }
                }                                     
                else if (filterjaql.filter.next) {
					    if (filterjaql.filter.next.anchor) {
                                var next = filterjaql.filter.next.count;
                                var offset = filterjaql.filter.next.offset;
                                var anchor = formatDateFromDate(filterjaql.filter.next.anchor);
                                $("#text-to-change").text("Date Range selected: Within " + next + " years, after: " + anchor + ", offset: " + offset);
                        }
                        else if (filterjaql.filter.next.offset === 0) {
                                var next = filterjaql.filter.next.count;
                                $("#text-to-change").text("Date Range selected: Next " + next + " years, Including current" );
                        }
                        else {
                                var next = filterjaql.filter.next.count;
                                var offset = filterjaql.filter.next.offset;
                                $("#text-to-change").text("Date Range selected: Next " + next + " years, offset " + offset + " years" );
                        }
                }
                else if (filterjaql.filter.top) {
                        var top = filterjaql.filter.top;
                        var rank = filterjaql.filter.rankingMessage;
                        $("#text-to-change").text("Date Range selected: Top " + top + " years, ranked by " + rank);
                }
                else if (filterjaql.filter.bottom) {
                        var bottom = filterjaql.filter.bottom;
                        var rank = filterjaql.filter.rankingMessage;
                        $("#text-to-change").text("Date Range selected: Bottom " + bottom + " years, ranked by " + rank);
                }
        }
        
        else if (filterjaql.level === 'quarters') {
                if (filterjaql.filter.members) {
                        var quarters = filterjaql.filter.members.map(function(dateString) {
                                return formatQuarterFromDate(dateString);
                        });
                        $("#text-to-change").text("Date Range selected (quarters): " + quarters.join(", "));
                } 
                else if (filterjaql.filter.exclude) {
                        var quarters = filterjaql.filter.exclude.members.map(function(dateString) {
                                return formatQuarterFromDate(dateString);
                        });
                        $("#text-to-change").text("Date Range selected (quarters): NOT " + quarters.join(", "));
                } 
                else if (filterjaql.filter.last) { 
                        if (filterjaql.filter.last.anchor) {
                                var last = filterjaql.filter.last.count;
                                var offset = filterjaql.filter.last.offset;
                                var anchor = formatDateFromDate(filterjaql.filter.last.anchor);
                                $("#text-to-change").text("Date Range selected: Within " + last + " quarters, before: " + anchor + ", offset: " + offset);
                        }
                        else if (filterjaql.filter.last.offset === 0) {
                                var last = filterjaql.filter.last.count;
                                $("#text-to-change").text("Date Range selected: Last " + last + " quarters, Including current" );
                        }
                        else {
                                var last = filterjaql.filter.last.count;
                                var offset = filterjaql.filter.last.offset;
                                $("#text-to-change").text("Date Range selected: Last " + last + " quarters, offset " + offset + " quarters" );
                        }
                }  
                else if (filterjaql.filter.next) {
					    if (filterjaql.filter.next.anchor) {
                                var next = filterjaql.filter.next.count;
                                var offset = filterjaql.filter.next.offset;
                                var anchor = formatDateFromDate(filterjaql.filter.next.anchor);
                                $("#text-to-change").text("Date Range selected: Within " + next + " quarters, after: " + anchor + ", offset: " + offset);
                        }
                        else if (filterjaql.filter.next.offset === 0) {
                                var next = filterjaql.filter.next.count;
                                $("#text-to-change").text("Date Range selected: Next " + next + " quarters, Including current" );
                        }
                        else {
                                var next = filterjaql.filter.next.count;
                                var offset = filterjaql.filter.next.offset;
                                $("#text-to-change").text("Date Range selected: Next " + next + " quarters, offset " + offset + " quarters" );
                        }
                }
                else if (filterjaql.filter.top) {
                        var top = filterjaql.filter.top;
                        var rank = filterjaql.filter.rankingMessage;
                        $("#text-to-change").text("Date Range selected: Top " + top + " quarters, ranked by " + rank);
                }
                else if (filterjaql.filter.bottom) {
                        var bottom = filterjaql.filter.bottom;
                        var rank = filterjaql.filter.rankingMessage;
                        $("#text-to-change").text("Date Range selected: Bottom " + bottom + " quarters, ranked by " + rank);
                }
        }
 
        else if (filterjaql.level === 'months') {
                if (filterjaql.filter.members) {
                        var months = filterjaql.filter.members.map(function(dateString) {
                                return formatMonthFromDate(dateString);
                        });
                        $("#text-to-change").text("Date Range selected (months): " + months.join(", "));
                } 
                else if (filterjaql.filter.exclude) {
                        var months = filterjaql.filter.exclude.members.map(function(dateString) {
                                return formatMonthFromDate(dateString);
                        });
                        $("#text-to-change").text("Date Range selected (months): NOT " + months.join(", "));
                } 
                else if (filterjaql.filter.last) { 
                        if (filterjaql.filter.last.anchor) {
                                var last = filterjaql.filter.last.count;
                                var offset = filterjaql.filter.last.offset;
                                var anchor = formatDateFromDate(filterjaql.filter.last.anchor);
                                $("#text-to-change").text("Date Range selected: Within " + last + " months, before: " + anchor + ", offset: " + offset);
                        }
                        else if (filterjaql.filter.last.offset === 0) {
                                var last = filterjaql.filter.last.count;
                                $("#text-to-change").text("Date Range selected: Last " + last + " months, Including current" );
                        }
                        else {
                                var last = filterjaql.filter.last.count;
                                var offset = filterjaql.filter.last.offset;
                                $("#text-to-change").text("Date Range selected: Last " + last + " months, offset " + offset + " months" );
                        }
                } 
                else if (filterjaql.filter.next) {
					    if (filterjaql.filter.next.anchor) {
                                var next = filterjaql.filter.next.count;
                                var offset = filterjaql.filter.next.offset;
                                var anchor = formatDateFromDate(filterjaql.filter.next.anchor);
                                $("#text-to-change").text("Date Range selected: Within " + next + " months, after: " + anchor + ", offset: " + offset);
                        }
                        else if (filterjaql.filter.next.offset === 0) {
                                var next = filterjaql.filter.next.count;
                                $("#text-to-change").text("Date Range selected: Next " + next + " months, Including current" );
                        }
                        else {
                                var next = filterjaql.filter.next.count;
                                var offset = filterjaql.filter.next.offset;
                                $("#text-to-change").text("Date Range selected: Next " + next + " months, offset " + offset + " months" );
                        }
                }
                else if (filterjaql.filter.top) {
                        var top = filterjaql.filter.top;
                        var rank = filterjaql.filter.rankingMessage;
                        $("#text-to-change").text("Date Range selected: Top " + top + " months, ranked by " + rank);
                }
                else if (filterjaql.filter.bottom) {
                        var bottom = filterjaql.filter.bottom;
                        var rank = filterjaql.filter.rankingMessage;
                        $("#text-to-change").text("Date Range selected: Bottom " + bottom + " months, ranked by " + rank);
                }
        }
         
        else if (filterjaql.level === 'weeks') {
                if (filterjaql.filter.members) {
                        var weeks = filterjaql.filter.members.map(function(dateString) {
                                return formatISOWeekFromDate(dateString);
                        });
                        $("#text-to-change").text("Date Range selected (weeks): " + weeks.join(", "));
                } 
                else if (filterjaql.filter.exclude) {
                        var weeks = filterjaql.filter.exclude.members.map(function(dateString) {
                                return formatISOWeekFromDate(dateString);
                        });
                        $("#text-to-change").text("Date Range selected (weeks): NOT " + weeks.join(", "));
                } 
                else if (filterjaql.filter.last) { 
                        if (filterjaql.filter.last.anchor) {
                                var last = filterjaql.filter.last.count;
                                var offset = filterjaql.filter.last.offset;
                                var anchor = formatDateFromDate(filterjaql.filter.last.anchor);
                                $("#text-to-change").text("Date Range selected: Within " + last + " weeks, before: " + anchor + ", offset: " + offset);
                        }
                        else if (filterjaql.filter.last.offset === 0) {
                                var last = filterjaql.filter.last.count;
                                $("#text-to-change").text("Date Range selected: Last " + last + " weeks, Including current" );
                        }
                        else {
                                var last = filterjaql.filter.last.count;
                                var offset = filterjaql.filter.last.offset;
                                $("#text-to-change").text("Date Range selected: Last " + last + " weeks, offset " + offset + " weeks" );
                        }
                } 
                else if (filterjaql.filter.next) {
					    if (filterjaql.filter.next.anchor) {
                                var next = filterjaql.filter.next.count;
                                var offset = filterjaql.filter.next.offset;
                                var anchor = formatDateFromDate(filterjaql.filter.next.anchor);
                                $("#text-to-change").text("Date Range selected: Within " + next + " weeks, after: " + anchor + ", offset: " + offset);
                        }
                        else if (filterjaql.filter.next.offset === 0) {
                                var next = filterjaql.filter.next.count;
                                $("#text-to-change").text("Date Range selected: Next " + next + " weeks, Including current" );
                        }
                        else {
                                var next = filterjaql.filter.next.count;
                                var offset = filterjaql.filter.next.offset;
                                $("#text-to-change").text("Date Range selected: Next " + next + " weeks, offset " + offset + " weeks" );
                        }
                }
                else if (filterjaql.filter.top) {
                        var top = filterjaql.filter.top;
                        var rank = filterjaql.filter.rankingMessage;
                        $("#text-to-change").text("Date Range selected: Top " + top + " weeks, ranked by " + rank);
                }
                else if (filterjaql.filter.bottom) {
                        var bottom = filterjaql.filter.bottom;
                        var rank = filterjaql.filter.rankingMessage;
                        $("#text-to-change").text("Date Range selected: Bottom " + bottom + " weeks, ranked by " + rank);
                }
        }

        else if (filterjaql.level === 'days') {
                if (filterjaql.filter.members) {
                        var days = filterjaql.filter.members.map(function(dateString) {
                                return formatDateFromDate(dateString);
                        });
                        $("#text-to-change").text("Date Range selected (days): " + days.join(", "));
                } 
                else if (filterjaql.filter.exclude) {
                        var days = filterjaql.filter.exclude.members.map(function(dateString) {
                                return formatDateFromDate(dateString);
                        });
                        $("#text-to-change").text("Date Range selected (days): NOT " + days.join(", "));
                } 
                else if (filterjaql.filter.last) { 
                        if (filterjaql.filter.last.anchor) {
                                var last = filterjaql.filter.last.count;
                                var offset = filterjaql.filter.last.offset;
                                var anchor = formatDateFromDate(filterjaql.filter.last.anchor);
                                $("#text-to-change").text("Date Range selected: Within " + last + " days, before: " + anchor + ", offset: " + offset);
                        }
                        else if (filterjaql.filter.last.offset === 0) {
                                var last = filterjaql.filter.last.count;
                                $("#text-to-change").text("Date Range selected: Last " + last + " days, Including current" );
                        }
                        else {
                                var last = filterjaql.filter.last.count;
                                var offset = filterjaql.filter.last.offset;
                                $("#text-to-change").text("Date Range selected: Last " + last + " days, offset " + offset + " days" );
                        }
                } 
                else if (filterjaql.filter.next) {
					    if (filterjaql.filter.next.anchor) {
                                var next = filterjaql.filter.next.count;
                                var offset = filterjaql.filter.next.offset;
                                var anchor = formatDateFromDate(filterjaql.filter.next.anchor);
                                $("#text-to-change").text("Date Range selected: Within " + next + " days, after: " + anchor + ", offset: " + offset);
                        }
                        else if (filterjaql.filter.next.offset === 0) {
                                var next = filterjaql.filter.next.count;
                                $("#text-to-change").text("Date Range selected: Next " + next + " days, Including current" );
                        }
                        else {
                                var next = filterjaql.filter.next.count;
                                var offset = filterjaql.filter.next.offset;
                                $("#text-to-change").text("Date Range selected: Next " + next + " days, offset " + offset + " days" );
                        }
                }
                else if (filterjaql.filter.top) {
                        var top = filterjaql.filter.top;
                        var rank = filterjaql.filter.rankingMessage;
                        $("#text-to-change").text("Date Range selected: Top " + top + " days, ranked by " + rank);
                }
                else if (filterjaql.filter.bottom) {
                        var bottom = filterjaql.filter.bottom;
                        var rank = filterjaql.filter.rankingMessage;
                        $("#text-to-change").text("Date Range selected: Bottom " + bottom + " days, ranked by " + rank);
                }
			    else if (filterjaql.filter.from && filterjaql.filter.to) {
                        var from = formatDateFromDate(filterjaql.filter.from);
                        var to = formatDateFromDate(filterjaql.filter.to);
                        $("#text-to-change").text("Date Range selected: from " + from + " to " + to);
                }
				else if (filterjaql.filter.from && !filterjaql.filter.to) {
                        var from = formatDateFromDate(filterjaql.filter.from);
                        $("#text-to-change").text("Date Range selected: from " + from);
                }
				else if (!filterjaql.filter.from && filterjaql.filter.to) {
                        var to = formatDateFromDate(filterjaql.filter.to);
                        $("#text-to-change").text("Date Range selected: to " + to);
                }
        }

});

  */      
        
