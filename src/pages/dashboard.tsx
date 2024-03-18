import React from 'react';
import { api } from "~/utils/api"

function dashboard() {
    const { mutate } = api.admin.sensitive.useMutation({})
  return (
    <div>Dashboard
        <button type='button' onClick={() => mutate()}>Secrets from beyond!</button>
    </div>
    
  )
}

export default dashboard