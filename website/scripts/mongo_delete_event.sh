#mongosh mongodb://root:DNAvCtakP9NtmxjhMnWujMr2v6C9@mongodb/soccer-tournament?authSource=admin

#Commands to execute:
#db.matches.find()
#db.players.find()
# db.players.updateOne({ name: "Henrique Sommer" }, { $set: { goals: 0 } })
# db.matches.updateOne( { matchNumber: 1 }, { $pull: { homeTeamEvents: { type: 'goals', player: 'André Gonçalves', minute: '01' } } } )
# db.matches.updateOne({ matchNumber: 1 }, { $set: { homeScore: 1 } })
