<h1>GraphQL App</h1>
<p>
     The server support 2 scenarios:
     <br/>Show List of Repositories 
     <br/>Show Repo details
</p>
     
<p>
     To start app locally:
     <code>
          docker-compose up -d
     </code>
</p>

<p>
     To stop app locally:
     <code>
          docker-compose down
     </code>
</p>
<p><strong>App will work on 8080 port on /graphql route</strong></p>
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


