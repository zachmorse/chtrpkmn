import React from 'react'
import { Multiselect } from 'multiselect-react-dropdown'

const Form = ({
    updateResults,
    searchTerm,
    setSearchTerm,
    types,
    weaknesses,
    handleTypeChange,
    handleWeaknessChange,
    selectedWeaknesses,
    selectedTypes,
}) => {
    return (
        <div className='form' style={{ textAlign: 'center', marginBottom: '30px' }}>
            <form onSubmit={updateResults}>
                <input
                    type='text'
                    value={searchTerm}
                    placeholder='Enter search term'
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <label className='selectBox'>
                    <div className='selectBox'>
                        <Multiselect
                            options={types}
                            isObject={false}
                            onSelect={handleTypeChange}
                            onRemove={handleTypeChange}
                            selectedvalues={selectedTypes}
                            placeholder={'Filter Types:'}
                        />
                    </div>
                </label>
                <label>
                    <div className='selectBox'>
                        <Multiselect
                            options={weaknesses}
                            isObject={false}
                            onSelect={handleWeaknessChange}
                            onRemove={handleWeaknessChange}
                            selectedvalues={selectedWeaknesses}
                            placeholder={'Filter Weaknesses:'}
                        />
                    </div>
                </label>
                <input type='submit' value='search' />
            </form>
        </div>
    )
}

export default Form
