document.addEventListener('DOMContentLoaded', function() {
    const unitSelector = document.getElementById('unit-selector');
    const metricUnits = document.getElementById('metric-units');
    const usUnits = document.getElementById('us-units');
    const resultBox = document.getElementById('result-box');
    const calculateBtn = document.querySelector('.Calculate');
    const clearBtn = document.querySelector('.Clear');

    function toggleUnits() {
        const isMetric = unitSelector.value === 'metric';
        metricUnits.style.display = isMetric ? 'flex' : 'none';
        usUnits.style.display = isMetric ? 'none' : 'flex';
        clearFields();
    }

    function calculateBMI() {
        try {
            const isMetric = unitSelector.value === 'metric';
            const weight = parseFloat(document.getElementById(isMetric ? 'weight-metric' : 'weight-us').value);
            const height = parseFloat(document.getElementById(isMetric ? 'height-metric' : 'height-us').value);

            if (!weight || !height || isNaN(weight) || isNaN(height)) {
                throw new Error('Please enter valid numbers for weight and height');
            }

            let bmi;
            if (isMetric) {
                if (weight < 20 || weight > 300) {
                    throw new Error('Weight must be between 20kg and 300kg');
                }
                if (height < 50 || height > 250) {
                    throw new Error('Height must be between 50cm and 250cm');
                }
                bmi = weight / Math.pow(height / 100, 2);
            } else {
                if (weight < 44 || weight > 660) {
                    throw new Error('Weight must be between 44lbs and 660lbs');
                }
                if (height < 20 || height > 98) {
                    throw new Error('Height must be between 20 and 98 inches');
                }
                bmi = (weight * 703) / Math.pow(height, 2);
            }

            const category = getBMICategory(bmi);
            const explanation = getCategoryExplanation(category);
            displayResult(bmi, category, explanation);

        } catch (error) {
            displayError(error.message);
        }
    }

    function getBMICategory(bmi) {
        if (bmi < 16) return 'Severe Thinness';
        if (bmi < 17) return 'Moderate Thinness';
        if (bmi < 18.5) return 'Mild Thinness';
        if (bmi < 25) return 'Normal';
        if (bmi < 30) return 'Overweight';
        if (bmi < 35) return 'Obese Class I';
        if (bmi < 40) return 'Obese Class II';
        return 'Obese Class III';
    }

    function getCategoryExplanation(category) {
        const explanations = {
            'Severe Thinness': {
                description: 'This indicates severely low body weight that requires immediate medical attention.',
                risks: 'High risk of health complications including malnutrition and weakened immune system.',
                recommendation: 'Seek immediate medical consultation and work with healthcare professionals for a safe weight gain plan.'
            },
            'Moderate Thinness': {
                description: 'Your body weight is significantly below the healthy range.',
                risks: 'Increased risk of nutritional deficiencies and reduced physical strength.',
                recommendation: 'Consult a healthcare provider and focus on healthy weight gain through balanced nutrition.'
            },
            'Mild Thinness': {
                description: 'Your weight is slightly below the healthy range.',
                risks: 'Potential for reduced energy levels and nutritional gaps.',
                recommendation: 'Work on gradually increasing caloric intake with nutrient-rich foods.'
            },
            'Normal': {
                description: 'Your weight is within the healthy range for your height.',
                risks: 'Maintain this healthy weight range to minimize health risks.',
                recommendation: 'Continue balanced diet and regular physical activity.'
            },
            'Overweight': {
                description: 'Your weight is above the recommended healthy range.',
                risks: 'Increased risk of cardiovascular issues and other health conditions.',
                recommendation: 'Focus on gradual weight loss through healthy diet and regular exercise.'
            },
            'Obese Class I': {
                description: 'Your weight significantly exceeds the healthy range.',
                risks: 'High risk of various health complications including diabetes and heart disease.',
                recommendation: 'Consult healthcare providers for a structured weight loss program.'
            },
            'Obese Class II': {
                description: 'Your weight is at a severe level above the healthy range.',
                risks: 'Serious health risks including cardiovascular disease and mobility issues.',
                recommendation: 'Seek professional medical guidance for weight management.'
            },
            'Obese Class III': {
                description: 'Your weight is at a very severe level requiring immediate attention.',
                risks: 'Critical health risks requiring immediate medical intervention.',
                recommendation: 'Urgent medical consultation and supervised weight management required.'
            }
        };
        return explanations[category];
    }

    function displayResult(bmi, category, explanation) {
        resultBox.innerHTML = `
            <h3><i class="fas fa-calculator"></i> Your Results</h3>
            <p><i class="fas fa-weight"></i> BMI: ${bmi.toFixed(1)}</p>
            <p><i class="fas fa-chart-line"></i> Category: ${category}</p>
            <div class="category-details">
                <p><i class="fas fa-info-circle"></i> ${explanation.description}</p>
                <div class="details-section">
                    <p><i class="fas fa-exclamation-triangle"></i> ${explanation.risks}</p>
                    <p><i class="fas fa-lightbulb"></i> ${explanation.recommendation}</p>
                </div>
            </div>
        `;
        resultBox.classList.remove('error');
        resultBox.classList.add('result-visible');
    }

    function displayError(message) {
        resultBox.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
            </div>
        `;
        resultBox.classList.add('result-visible', 'error');
    }

    function clearFields() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
        resultBox.classList.remove('result-visible', 'error');
        resultBox.innerHTML = '';
    }

    unitSelector.addEventListener('change', toggleUnits);
    calculateBtn.addEventListener('click', calculateBMI);
    clearBtn.addEventListener('click', clearFields);
});