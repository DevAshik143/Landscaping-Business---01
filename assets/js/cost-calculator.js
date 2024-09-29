$(document).ready(function () {

    const $form = $('.calculator-form'); // Form where user inputs data
    const $totalDisplay = $('.cost-total span'); // Element where total cost will be displayed

    // Function to update the total cost based on user inputs
    function updateTotal() {
        const serviceType = $form.find('[name="service-type"]').val(); // Type of gardening service
        const propertyType = $form.find('[name="property-type"]').val(); // Residential or commercial
        const areaSize = parseFloat($form.find('[name="area-size"]').val()) || 0; // Size of area in square meters
        const gardenStyle = $form.find('[name="garden-style"]').val(); // Style of garden
        const numberOfPlants = parseInt($form.find('[name="number-of-plants"]').val()) || 0; // Number of plants
        const projectUrgency = $form.find('[name="project-urgency"]').val(); // Urgency of project
        const soilType = $form.find('[name="soil-type"]').val(); // Type of soil or substrate
        const budget = $form.find('[name="budget"]').val(); // User's budget range

        let total = 0; // Initialize total cost

        // Calculate base cost based on selected service type and property type
        if (serviceType && propertyType) {
            total += getServiceCost(serviceType, propertyType);
        }

        // Add cost for area size ($10 per square meter)
        total += areaSize * 10;

        // Add cost for number of plants ($5 per plant)
        total += numberOfPlants * 5;

        // Add cost for garden style based on selected style
        total += getGardenStyleCost(gardenStyle);

        // Add cost based on project urgency
        total += getProjectUrgencyCost(projectUrgency);

        // Add cost based on selected soil type
        total += getSoilTypeCost(soilType);

        // Add additional costs based on selected extra services (checkboxes)
        if ($form.find('#automated-irrigation-checkbox').is(':checked')) total += 500;
        if ($form.find('#custom-pathways-checkbox').is(':checked')) total += 300;
        if ($form.find('#outdoor-seating-checkbox').is(':checked')) total += 700;

        // Adjust total based on user's selected budget range
        total = adjustForBudget(total, budget);

        // Display the calculated total cost in the specified element
        $totalDisplay.text(`$${total.toFixed(2)}`); // Format total cost with dollar sign and two decimal places
    }

    // Function to calculate base cost based on service type and property type
    function getServiceCost(serviceType, propertyType) {
        // Base costs for different types of gardening services
        const baseCosts = {
            'lawn-maintenance': 100,
            'garden-design': 200,
            'tree-planting': 150,
            'hardscaping': 300,
            'water-features': 400,
            'outdoor-lighting': 250,
        };

        // Apply multiplier for commercial properties
        const propertyMultiplier = propertyType === 'commercial' ? 1.5 : 1;

        // Calculate and return the adjusted base cost based on selected service type
        return baseCosts[serviceType] * propertyMultiplier || 0; // Return 0 if serviceType is not found
    }

    // Function to retrieve cost based on selected garden style
    function getGardenStyleCost(gardenStyle) {
        // Costs associated with different garden styles
        const gardenStyleCosts = {
            'native': 100,
            'formal': 200,
            'cottage': 150,
            'japanese': 250,
            'modern': 300,
            'eclectic': 200,
            'default': 0 // Default cost if style is not recognized
        };
        return gardenStyleCosts[gardenStyle] || 0; // Return cost of selected garden style or default if not found
    }

    // Function to retrieve cost based on project urgency
    function getProjectUrgencyCost(projectUrgency) {
        // Costs associated with different project urgency levels
        const projectUrgencyCosts = {
            'asap': 300,
            'within-a-month': 200,
            'within-three-months': 100,
            'no-rush': 0 // No additional cost for "no rush" projects
        };
        return projectUrgencyCosts[projectUrgency] || 0; // Return cost based on selected urgency or 0 if not found
    }

    // Function to retrieve cost based on selected soil type
    function getSoilTypeCost(soilType) {
        // Costs associated with different soil types
        const soilTypeCosts = {
            'loam': 50,
            'sandy': 30,
            'clay': 40,
            'silt': 45,
            'peat': 60,
            'chalk': 55,
            'rocky': 70,
        };
        return soilTypeCosts[soilType] || 0; // Return cost of selected soil type or 0 if not found
    }

    // Function to adjust total cost based on user's budget range
    function adjustForBudget(total, budget) {
        // Define budget limits and corresponding maximum total costs
        const budgetLimits = {
            'under-1000': 1000,
            '1000-5000': 5000,
            '5000-10000': 10000,
            '10000-20000': 20000,
            'over-20000': Infinity,
            'not-sure': Infinity // Default maximum if user is unsure about budget
        };

        // Retrieve maximum total cost based on user's selected budget range
        const maxBudget = budgetLimits[budget] || Infinity;

        // Return adjusted total cost (cannot exceed maximum budget limit)
        return total > maxBudget ? maxBudget : total;
    }

    // When any input in the form changes, update the total cost
    $form.on('input', updateTotal);

});
