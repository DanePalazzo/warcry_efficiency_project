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

    let outputObject, setoutputObject = useState({
        DPAA: 0,
        PPD: 0,
        AATK: 0,
        EHP: 0,
        displayVsToughness: 0,
        displayVsWounds: 0,
        displayVsStrength: 0
    })


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
        let DPAA = (((((successes - 1) * statsObject.normalDamage) + statsObject.critDamage) / successes) * (successes / 6)) * statsObject.attacks
        // PPD: Points Per 1 Damage vs X Toughness (lower is better)
        let PPD = DPAA / statsObject.points
        // AATK: Average Attacks to Kill vs X Toughness and Z Wounds (lower is better)
        let AATK = wounds == 0 ? 1 : Math.ceil(DPAA / wounds)
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
        let EHP = (variation / 3) * statsObject.wounds
        // Object to return
        returnObject = {
            DPAA: DPAA,
            PPD: PPD,
            AATK: AATK,
            EHP: EHP,
            displayVsToughness: toughness,
            displayVsWounds: wounds,
            displayVsStrength: strength
        }
        setoutputObject(returnObject)
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
        <div className="flex flex-col">
            <h2 className="flex flex-row mx-auto my-3 text-3xl font-bold">Warcry Stat Calculator</h2>
            <div className="flex flex-col w-1/2 self-center">
                <form onSubmit={calculateStats(statsObject, vsToughness, vsWounds, vsStrenght)} className="flex flex-col bg-[#111111] p-3 rounded-xl">
                    <div className='grid grid-cols-2'>
                        <div className="flex flex-col grid-span-1">
                            <h2 className="flex flex-row mx-auto my-3 text-xl font-bold">Your Fighter</h2>
                            <label className='flex justify-self-start'>Points:</label>
                            <input
                                type="number"
                                onChange={(e) => handleChange(e, 'points')}
                                value={statsObject.points}
                                className='flex flex-grow bg-[#2a2a2a] rounded-xl p-2 text-gray-400' />
                            <label className='flex justify-self-start'>Strength:</label>
                            <input
                                type="number"
                                onChange={(e) => handleChange(e, 'strenght')}
                                value={statsObject.strenght}
                                className='flex flex-grow bg-[#2a2a2a] rounded-xl p-2 text-gray-400' />
                            <label className='flex justify-self-start'>Attacks:</label>
                            <input
                                type="number"
                                onChange={(e) => handleChange(e, 'attacks')}
                                value={statsObject.attacks}
                                className='flex flex-grow bg-[#2a2a2a] rounded-xl p-2 text-gray-400' />
                            <label className='flex justify-self-start'>Normal Damage:</label>
                            <input
                                type="number"
                                onChange={(e) => handleChange(e, 'normalDamage')}
                                value={statsObject.normalDamage}
                                className='flex flex-grow bg-[#2a2a2a] rounded-xl p-2 text-gray-400' />
                            <label className='flex justify-self-start'>Critical Damage:</label>
                            <input
                                type="number"
                                onChange={(e) => handleChange(e, 'critDamage')}
                                value={statsObject.critDamage}
                                className='flex flex-grow bg-[#2a2a2a] rounded-xl p-2 text-gray-400' />
                            <label className='flex justify-self-start'>Toughness:</label>
                            <input
                                type="number"
                                onChange={(e) => handleChange(e, 'toughness')}
                                value={statsObject.toughness}
                                className='flex flex-grow bg-[#2a2a2a] rounded-xl p-2 text-gray-400' />
                            <label className='flex justify-self-start'>Wounds:</label>
                            <input
                                type="number"
                                onChange={(e) => handleChange(e, 'wounds')}
                                value={statsObject.wounds}
                                className='flex flex-grow bg-[#2a2a2a] rounded-xl p-2 text-gray-400' />
                        </div>
                        <div className="flex flex-col grid-span-1">
                            <h2 className="flex flex-row mx-auto my-3 text-xl font-bold">Opposing Fighter</h2>
                            <label className='flex justify-self-start'>Toughness:</label>
                            <input
                                type="number"
                                onChange={(e) => setVsToughness(e.target.value)}
                                value={vsToughness}
                                className='flex flex-grow bg-[#2a2a2a] rounded-xl p-2 text-gray-400' />
                            <label className='flex justify-self-start'>Wounds:</label>
                            <input
                                type="number"
                                onChange={(e) => setVsWounds(e.target.value)}
                                value={vsWounds}
                                className='flex flex-grow bg-[#2a2a2a] rounded-xl p-2 text-gray-400' />
                            <label className='flex justify-self-start'>Strength:</label>
                            <input
                                type="number"
                                onChange={(e) => setVsStrenght(e.target.value)}
                                value={vsStrenght}
                                className='flex flex-grow bg-[#2a2a2a] rounded-xl p-2 text-gray-400' />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-outline btn-success">
                        CALCULATE
                    </button>
                </form>
            </div>
            <div className="flex flex-col bg-[#111111] p-3 rounded-xl">
                <h4 className='flex justify-self-start'> Damage Per Attack Action vs {outputObject.displayVsToughness} Toughness: {outputObject.DPAA} (higher is better)</h4>
                <h4 className='flex justify-self-start'> Points Per 1 Damage vs {outputObject.displayVsToughness} Toughness: {outputObject.PPD} (lower is better)</h4>
                <h4 className='flex justify-self-start'> Average Attacks to Kill vs {outputObject.displayVsToughness} Toughness and {outputObject.displayVsWounds} Wounds: {outputObject.AATK} (lower is better)</h4>
                <h4 className='flex justify-self-start'> Estimated Hit Points vs {outputObject.displayVsWounds} Strenght: {outputObject.EHP} (higher is better)</h4>
            </div>
        </div>
    )
}

export default statCalculator