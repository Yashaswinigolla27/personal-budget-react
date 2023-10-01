import React from "react";

function HomePage() {
  return (
    <div className="container center">
    <div className="page-area" id = "main-content">

            <h2>Stay on track</h2>
            <p>
                Do you know where you are spending your money? If you really stop to track it down,
                you would get surprised! Proper budget management depends on real data... and this
                app will help you with that!
            </p>

            <h2>Alerts</h2>
            <p>
                What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
            </p>

            <h2>Results</h2>
            <p>
                People who stick to a financial plan, budgeting every expense, get out of debt faster!
                Also, they to live happier lives... since they expend without guilt or fear... 
                because they know it is all good and accounted for.
            </p>

            <h2>Chart</h2>
            <p>
                <canvas id="myChart" width="400" height="400"></canvas>   

            </p>

            <h2>D3JS Chart</h2>
            <p>
                <canvas id="d3DonutChart"></canvas>
            </p>
        
        

    </div>

</div>

  );
}

export default HomePage;
