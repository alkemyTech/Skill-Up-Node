module.exports = {
    userPayload: (password, id, roleId, email) => {
        const payload = {
          password,
          id,
          roleId,
          email
        }
        return payload
      },
      
      userResponse: (firstName, lastName, email, token) => {
        const response = {
          firstName,
          lastName,
          email,
          token
        }
        return response
      },
    
      transactionPayload: (id, userId) => {
        const payload = {
          id,
          userId
        }
        return payload
      },
      
      transactionResponse: (description, amount, date, token) => {
        const response = {
          description,
          amount,
          date,
          token
        }
        return response
      }
}

