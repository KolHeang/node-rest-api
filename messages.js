class Messages {

    success = (result) => {
        let json = {
            "status": 200,
            "total": result.rowCount,
            "result": result.rows
        }
    
        return json;
    }

    errorId = (id) => {
        let json = {
            "status": 400,
            "result": [{
                "error": `id not found: ${id}`
            }]
        }
    
        return json;
    }

    error = (error) => {
        let json = {
            "status": 500,
            "result": error
        }
    
        return json;
    }
}

module.exports={ Messages }

