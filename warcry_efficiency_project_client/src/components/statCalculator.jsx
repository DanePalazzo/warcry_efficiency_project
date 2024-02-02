import React from 'react'
import { useState } from 'react'

function statCalculator() {
    let statsObject, setStatsObject = useState({
        points: 0,
        strength: 0,
        attacks: 0,
        normalDamage: 0,
        critDamage: 0,
        toughness: 0,
        wounds: 0
    })

    function calculateStats(statsObject, toughness) {
        let successes = 3
        if (toughness / 2 >= statsObject.strength) {
            successes = 1
        } else if (statsObject.strength / 2 >= toughness) {
            successes = 5
        } else if (toughness >= statsObject.strength) {
            successes = 2
        } else if (statsObject.strength >= toughness) {
            successes = 4
        }
        // DPAA is Damage Per Attack Action (higher is better)
        let DPAA = (((((successes - 1)*statsObject.normalDamage) + statsObject.critDamage) * / successes) * (successes/6)) * statsObject.attacks
        // PPD is Points Per 1 Damage (lower is better)
        let PPD = DPAA/statsObject.points
        // EHP Estimated Hit Points (higher is better)
        
        // 
    }

    const handleChange = (e, key) => {
        const value = e.target.value;
        setStatsObject(prevState => ({
          ...prevState,
          [key]: isNaN(parseFloat(value)) ? 0 : parseFloat(value),
        }));
      };

    return (
        <div>
            <input
                type="number"
                onChange={(e) => handleChange(e, 'points')}
                value={statsObject.points}
                className='flex flex-grow bg-[#2a2a2a] rounded-xl p-2 text-gray-400'/>
            <button type="submit" className="btn btn-outline btn-success">CALCULATE</button>
        </div>
    )
}

export default statCalculator