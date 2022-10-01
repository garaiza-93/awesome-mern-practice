import axios from 'axios'

const GOALS_URL = '/api/goals/'

const create = async (goalData, userToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }

    const response = await axios.post(GOALS_URL, goalData, config)

    return response.data
}
const get = async (userToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }

    const response = await axios.get(GOALS_URL, config)

    return response.data
}
const update = () => {}
const del = async (goalID, userToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }

    const response = await axios.delete(GOALS_URL + goalID, config)

    return response.data
}

const goalService = {
    create,
    get,
    update,
    del
}

export default goalService