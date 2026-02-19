// Motoko backend for tracking Green Credit submissions (resale, upcycle, recycle)
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Data structure for clothing submissions
  type Submission = {
    submissionType : SubmissionType;
    clothingType : ClothingType;
    quantity : Nat;
    creditsEarned : Nat;
    timestamp : Time.Time;
  };

  type SubmissionType = {
    #resale;
    #upcycle;
    #recycle;
  };

  type ClothingType = {
    #shirt;
    #pants;
    #jacket;
    #dress;
    #accessory;
  };

  type SubmissionResult = {
    status : Text;
    creditsEarned : Nat;
    remainingBalance : Nat;
  };

  // State: submissions map and wallet balance
  var submissions : Map.Map<Nat, Submission> = Map.empty<Nat, Submission>();
  var nextSubmissionId = 0;
  var greenCreditBalance : Nat = 0;

  // Public function to submit a new clothing item
  public shared ({ caller }) func submitClothing(submissionType : SubmissionType, clothingType : ClothingType, quantity : Nat) : async SubmissionResult {
    if (quantity == 0) {
      Runtime.trap("Quantity must be greater than 0");
    };

    let credits = calculateCredits(submissionType, quantity);
    let timestamp = Time.now();

    let newSubmission : Submission = {
      submissionType;
      clothingType;
      quantity;
      creditsEarned = credits;
      timestamp;
    };

    submissions.add(nextSubmissionId, newSubmission);
    nextSubmissionId += 1;
    greenCreditBalance += credits;

    {
      status = "success";
      creditsEarned = credits;
      remainingBalance = greenCreditBalance;
    };
  };

  // Helper function to calculate credits based on submission type and quantity
  func calculateCredits(submissionType : SubmissionType, quantity : Nat) : Nat {
    switch (submissionType) {
      case (#resale) { quantity * 2 };
      case (#upcycle) { quantity * 3 };
      case (#recycle) { quantity };
    };
  };

  // Query methods to access submission history and balance
  public query ({ caller }) func getSubmissionCount() : async Nat {
    submissions.size();
  };

  public query ({ caller }) func getSubmission(id : Nat) : async ?Submission {
    submissions.get(id);
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissions.values().toArray();
  };

  public query ({ caller }) func getGreenCreditBalance() : async Nat {
    greenCreditBalance;
  };
};
