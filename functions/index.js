const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

// Trigger when a new response is created
exports.updateStats = onDocumentCreated("responses/{responseId}", async (event) => {
  const response = event.data.data();
  const weekOf = response.weekOf;
  const score = response.score;
  const total = response.total;

  if (!weekOf || score === undefined || !total) {
    console.log("Missing required fields in response");
    return null;
  }

  const statsRef = db.collection("stats").doc(weekOf);

  try {
    await db.runTransaction(async (transaction) => {
      const statsDoc = await transaction.get(statsRef);

      if (!statsDoc.exists) {
        // Create new stats document
        const scoreCounts = {};
        scoreCounts[score.toString()] = 1;

        transaction.set(statsRef, {
          weekOf: weekOf,
          total: total,
          totalPlayers: 1,
          scoreCounts: scoreCounts,
        });
      } else {
        // Update existing stats
        const data = statsDoc.data();
        const scoreCounts = data.scoreCounts || {};
        const currentCount = scoreCounts[score.toString()] || 0;
        scoreCounts[score.toString()] = currentCount + 1;

        transaction.update(statsRef, {
          totalPlayers: (data.totalPlayers || 0) + 1,
          scoreCounts: scoreCounts,
        });
      }
    });

    console.log(`Updated stats for week ${weekOf}, score ${score}`);
    return null;
  } catch (error) {
    console.error("Error updating stats:", error);
    return null;
  }
});
