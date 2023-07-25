const getAway = `SELECT T.team_name AS name,
    SUM(M.away_team_goals > M.home_team_goals) * 3 +
    SUM(M.away_team_goals = M.home_team_goals) AS totalPoints,
    COUNT(*) AS totalGames,
    SUM(M.away_team_goals > M.home_team_goals) AS totalVictories,
    SUM(M.away_team_goals = M.home_team_goals) AS totalDraws,
    SUM(M.away_team_goals < M.home_team_goals) AS totalLosses,
    SUM(M.away_team_goals) AS goalsFavor,
    SUM(M.home_team_goals) AS goalsOwn,
    SUM(M.away_team_goals - M.home_team_goals) AS goalsBalance,
    ROUND((SUM(M.away_team_goals > M.home_team_goals) * 3 +
        SUM(M.away_team_goals = M.home_team_goals)) / (COUNT(*) * 3) * 100, 2) AS efficiency
    FROM TRYBE_FUTEBOL_CLUBE.matches AS M
    JOIN TRYBE_FUTEBOL_CLUBE.teams AS T ON M.away_team_id = T.id
    WHERE M.in_progress = 0
    GROUP BY T.team_name
    ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;`;

export default getAway;
