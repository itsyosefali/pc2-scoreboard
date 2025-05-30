<template>
    <div class="scoreboard-container dark-theme" >
      <div class="container is-max-widescreen">
        <h1 class="title has-text-centered is-size-1 has-text-weight-bold mb-6 glow-text">
          {{ contestName }}
        </h1>
        
        <div class="table-container glass-box">
          <table class="table is-fullwidth is-hoverable">
            <thead>
              <tr class="has-background-primary-dark">
                <th class="has-text-white">Rank</th>
                <th class="has-text-white">Team</th>
                <th class="has-text-white has-text-centered">Solved</th>
                <th class="has-text-white has-text-centered">Penalty</th>
                <th 
                  v-for="problem in problems" 
                  :key="problem"
                  class="has-text-white has-text-centered"
                >
                  {{ problem }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(team, index) in sortedTeams"
                :key="team.name"
                class="table-row-dark"
              >
                <td class="has-text-weight-bold">{{ index + 1 }}</td>
                <td class="has-text-weight-bold has-text-info">{{ team.name }}</td>
                <td class="has-text-success has-text-centered has-text-weight-bold">{{ team.solved }}</td>
                <td class="has-text-centered has-text-light">{{ team.penalty }}</td>
                <td 
                  v-for="(problem, pIdx) in problems" 
                  :key="problem"
                  class="has-text-centered"
                >
                  <span 
                    v-if="team.problems[pIdx]"
                    class="tag is-medium"
                    :class="team.problems[pIdx].correct ? 'is-success glow' : 'is-danger'"
                  >
                    {{ getProblemSymbol(team.problems[pIdx]) }} ({{ team.problems[pIdx].attempts }})
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="level mt-5">
          <div class="level-left">
            <div class="level-item">
              <span class="tag is-success is-medium mr-2">+</span>
              <span class="has-text-light">Correct</span>
            </div>
            <div class="level-item">
              <span class="tag is-danger is-medium mr-2">-</span>
              <span class="has-text-light">Incorrect</span>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span class="has-text-grey-light">Last updated: {{ lastUpdated }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { fetchContestData, fetchTeamData } from '../services/pc2Api';

  export default {
    data() {
      return {
        contestName: "CET LCPC CETSU 2025",
        lastUpdated: new Date().toLocaleTimeString(),
        problems: Array.from({length: 10}, (_, i) => String.fromCharCode(65 + i)), // A-J
        teams: []
      }
    },
    computed: {
      sortedTeams() {
        return [...this.teams].sort((a, b) => {
          if (b.solved !== a.solved) return b.solved - a.solved
          return a.penalty - b.penalty
        })
      }
    },
    methods: {
      async loadData() {
        const contestData = await fetchContestData();
        this.contestName = contestData.name;
        this.teams = await fetchTeamData();
        this.lastUpdated = new Date().toLocaleTimeString();
      },
      getProblemSymbol(problem) {
        return problem.correct ? '+' : '-'
      },
      updateScoreboard() {
        this.lastUpdated = new Date().toLocaleTimeString();
      }
    },
    mounted() {
      this.loadData();
      setInterval(this.updateScoreboard, 30000);
    }
  }
  </script>

  <style>
  @import 'bulma/css/bulma.min.css';

  .scoreboard-container.dark-theme {
    color: #e6e6e6;
  }

  html, body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  .container.is-max-widescreen {
    width: 100vw !important;
    height: 100vh !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
  }

  .glass-box {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
    overflow: hidden;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .table {
    background-color: transparent;
    color: #e6e6e6;
    width: 100%;
  }

  .table-row-dark {
    background-color: rgba(26, 26, 46, 0.7);
    transition: all 0.3s ease;
  }

  .table-row-dark:hover {
    background-color: rgba(56, 56, 89, 0.7) !important;
  }

  .table td, .table th {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .has-text-light {
    color: #f0f0f0 !important;
  }

  .has-text-info {
    color: #7fd8ff !important;
  }

  .glow-text {
    color: #ffffff;
    text-shadow: 0 0 10px rgba(100, 200, 255, 0.7);
  }

  .tag.glow {
    box-shadow: 0 0 8px rgba(72, 199, 142, 0.6);
  }

  .table-container {
    max-height: 70vh;
    overflow-y: auto;
  }

  .table-container::-webkit-scrollbar {
    width: 8px;
  }

  .table-container::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  .table-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }

  thead th {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #1e3a8a !important; 
  }

  @media screen and (max-width: 768px) {
    .table td, .table th {
      padding: 0.5em 0.75em;
    }
    
    .title {
      font-size: 1.75rem !important;
    }
  }

  .container {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  </style>