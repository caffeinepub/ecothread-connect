import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

module {
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

  type OldActor = {};
  type NewActor = {
    submissions : Map.Map<Nat, Submission>;
    nextSubmissionId : Nat;
    greenCreditBalance : Nat;
  };

  public func run(_ : OldActor) : NewActor {
    { submissions = Map.empty<Nat, Submission>(); nextSubmissionId = 0; greenCreditBalance = 0 };
  };
};
