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
    let vsToughness, setVsToughness = useState(0)
    let vsWounds, setVsWounds = useState(0)
    let vsStrenght, setVsStrenght = useState(0)


    function calculateStats(statsObject, toughness, wounds, strength) {
        // DPAA: Damage Per Attack Action vs X Toughness (higher is better)
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
        let DPAA = (((((successes - 1)*statsObject.normalDamage) + statsObject.critDamage) / successes) * (successes/6)) * statsObject.attacks
        // PPD: Points Per 1 Damage vs X Toughness (lower is better)
        let PPD = DPAA/statsObject.points
        // AATK: Average Attacks to Kill vs X Toughness and Z Wounds (lower is better)
        let AATK = wounds == 0 ? 1 : Math.ceil(DPAA/wounds)
        // EHP: Estimated Hit Points vs Y Strenght (higher is better)
        let variation = 3
        if (strength / 2 >= statsObject.toughness) {
            variation = 1
        } else if (statsObject.toughness / 2 >= strength) {
            variation = 5
        } else if (strength >= statsObject.toughness) {
            variation = 2
        } else if (statsObject.toughness >= strength) {
            variation = 4
        }
        let EHP = (variation/3) * statsObject.wounds
        // Object to return
        returnObject = {
            DPAA: DPAA,
            PPD: PPD,
            AATK: AATK,
            EHP: EHP
        }
        return returnObject
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
            <button 
                type="submit" 
                onSubmit={calculateStats(statsObject, vsToughness, vsWounds, vsStrenght)}
                className="btn btn-outline btn-success">
                CALCULATE
            </button>
        </div>
    )
}

export default statCalculator