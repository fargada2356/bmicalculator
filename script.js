document.addEventListener('DOMContentLoaded', function() {
    const unitSelector = document.getElementById('unit-selector');
    const metricUnits = document.getElementById('metric-units');
    const usUnits = document.getElementById('us-units');
    const resultBox = document.getElementById('result-box');
    const calculateBtn = document.querySelector('.Calculate');
    const clearBtn = document.querySelector('.Clear');

    function toggleUnits() {
        if (unitSelector.value === 'metric') {
            metricUnits.style.display = 'flex';
            usUnits.style.display = 'none';
        } else {
            metricUnits.style.display = 'none';
            usUnits.style.display = 'flex';
        }
        clearFields();
    }

    function calculateBMI() {
        let weight, height, bmi;
        const isMetric = unitSelector.value === 'metric';
        
        if (isMetric) {
            weight = parseFloat(document.getElementById('weight-metric').value);
            height = parseFloat(document.getElementById('height-metric').value) / 100;
        } else {
            weight = parseFloat(document.getElementById('weight-us').value) * 0.453592;
            height = parseFloat(document.getElementById('height-us').value) * 0.0254;
        }

        if (!weight || !height || weight <= 0 || height <= 0) {
            alert('Please enter valid weight and height values');
            return;
        }

        bmi = weight / (height * height);
        const category = getBMICategory(bmi);
        const recommendation = getRecommendation()[category];
        
        resultBox.innerHTML = `
            <h3>Your Results</h3>
            <p>Your BMI: ${bmi.toFixed(1)}</p>
            <p>Category: ${category}</p>
            <div class="recommendation">
                <h4>${recommendation.title}</h4>
                <ul>
                    ${recommendation.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
        resultBox.classList.add('result-visible');
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

    function getRecommendation() {
        return {
            'Severe Thinness': {
                title: 'Recommendation for Severe Thinness',
                tips: [
                    'Eat foods with enough energy to help you gain weight',
                    'Include protein-rich foods to build muscles',
                    'Ensure adequate vitamins and minerals intake'
                ]
            },
            'Moderate Thinness': {
                title: 'Recommendation for Moderate Thinness',
                tips: [
                    'Increase calorie intake with nutrient-dense foods',
                    'Include strength training exercises',
                    'Consult a nutritionist for a personalized meal plan'
                ]
            },
            'Mild Thinness': {
                title: 'Recommendation for Mild Thinness',
                tips: [
                    'Focus on balanced diet with slight calorie surplus',
                    'Regular physical activity',
                    'Monitor weight gain progress'
                ]
            },
            'Normal': {
                title: 'Maintaining Healthy Weight',
                tips: [
                    'Maintain balanced diet and regular exercise <i class="fa-solid fa-dumbbell"></i>',
                    'Regular health check-ups <i class="fa-solid fa-notes-medical"></i>',
                    'Stay hydrated and active <i class="fa-solid fa-bottle-water"></i>'
                ]
            },
            'Overweight': {
                title: 'Weight Management Tips',
                tips: [
                    'Create a moderate calorie deficit',
                    'Increase physical activity <i class="fa-solid fa-dumbbell"></i>',
                    'Choose whole, nutrient-dense foods'
                ]
            },
            'Obese Class I': {
                title: 'Weight Loss Recommendations',
                tips: [
                    'Consult healthcare provider',
                    'Create structured meal plan',
                    'Regular exercise routine <i class="fa-solid fa-dumbbell"></i>'
                ]
            },
            'Obese Class II': {
                title: 'Medical Weight Management',
                tips: [
                    'Seek medical supervision',
                    'Consider behavioral therapy',
                    'Structured exercise program'
                ]
            },
            'Obese Class III': {
                title: 'Comprehensive Weight Management',
                tips: [
                    'Work with healthcare team',
                    'Consider medical interventions',
                    'Regular monitoring and support'
                ]
            }
        };
    }

    function clearFields() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
        resultBox.classList.remove('result-visible');
    }

    unitSelector.addEventListener('change', toggleUnits);
    calculateBtn.addEventListener('click', calculateBMI);
    clearBtn.addEventListener('click', clearFields);
});