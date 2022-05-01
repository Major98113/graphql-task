<h1>GraphQL App</h1>
<p>
     The server support 2 scenarios:
     <br/>Show List of Repositories 
     <br/>Show Repo details
</p>
     
<p>
     To start backend app locally:
     <code>
          docker-compose up -d
     </code>
</p>

<p>
     To stop backend app locally:
     <code>
          docker-compose down
     </code>
</p>
<p><strong>App will work on 8080 port on /graphql route</strong></p>
<p>
     To start frontend app locally on 3000 port you need install all dependencies and run with next command:
     <code>
          npm start
     </code>
</p>

<h2>Examples</h2>
<code>
 {
  getAllRepos{
    name,
    owner {
      login,
      type
    }
    size
  }
}
</code>
</br>
<code>
 {
  getRepoById(id: "benchmark"){
    size,
    name,
    private
  }
}
</code>


