import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  module MoodEntry {
    public func compare(entry1 : MoodEntry, entry2 : MoodEntry) : Order.Order {
      Int.compare(entry1.timestamp, entry2.timestamp);
    };
  };

  module ChatMessage {
    public func compare(message1 : ChatMessage, message2 : ChatMessage) : Order.Order {
      Int.compare(message1.timestamp, message2.timestamp);
    };
  };

  type UserId = Principal;
  type Sender = { #user; #bot };
  type MoodEntry = {
    moodScore : Nat8;
    emotionTags : [Text];
    notes : ?Text;
    timestamp : Time.Time;
  };

  type ChatMessage = {
    sender : Sender;
    message : Text;
    timestamp : Time.Time;
  };

  type UserConsent = {
    hasConsented : Bool;
    timestamp : Time.Time;
  };

  let moodEntries = Map.empty<UserId, List.List<MoodEntry>>();
  let chatHistories = Map.empty<UserId, List.List<ChatMessage>>();
  let userConsents = Map.empty<UserId, UserConsent>();

  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public shared ({ caller }) func saveConsent(consented : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save consent");
    };
    
    let consent = {
      hasConsented = consented;
      timestamp = Time.now();
    };
    userConsents.add(caller, consent);
  };

  public shared ({ caller }) func addMoodEntry(moodScore : Nat8, emotionTags : [Text], notes : ?Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add mood entries");
    };
    
    let entry = {
      moodScore;
      emotionTags;
      notes;
      timestamp = Time.now();
    };

    switch (moodEntries.get(caller)) {
      case (?entries) {
        entries.add(entry);
        moodEntries.add(caller, entries);
      };
      case (null) {
        let newEntries = List.empty<MoodEntry>();
        newEntries.add(entry);
        moodEntries.add(caller, newEntries);
      };
    };
  };

  public shared ({ caller }) func saveChatMessage(sender : Sender, message : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save chat messages");
    };
    
    let chatMessage = {
      sender;
      message;
      timestamp = Time.now();
    };

    switch (chatHistories.get(caller)) {
      case (?messages) {
        messages.add(chatMessage);
        chatHistories.add(caller, messages);
      };
      case (null) {
        let newMessages = List.empty<ChatMessage>();
        newMessages.add(chatMessage);
        chatHistories.add(caller, newMessages);
      };
    };
  };

  public query ({ caller }) func getRecentMoodEntries() : async [MoodEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view mood entries");
    };
    
    let now = Time.now();
    let sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1_000_000_000);

    switch (moodEntries.get(caller)) {
      case (?entries) {
        entries.values().toArray().filter<MoodEntry>(
          func(entry) {
            entry.timestamp >= sevenDaysAgo;
          }
        );
      };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getAllMoodEntries() : async [MoodEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view mood entries");
    };
    
    switch (moodEntries.get(caller)) {
      case (?entries) { entries.values().toArray() };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getChatHistory() : async [ChatMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view chat history");
    };
    
    switch (chatHistories.get(caller)) {
      case (?messages) { 
        let messagesArray = messages.values().toArray();
        messagesArray.sort<ChatMessage>();
      };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getLatestMoodEntry() : async ?MoodEntry {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view mood entries");
    };
    
    switch (moodEntries.get(caller)) {
      case (?entries) {
        if (entries.isEmpty()) {
          null;
        } else {
          ?entries.at(0);
        };
      };
      case (null) { null };
    };
  };

  public query ({ caller }) func hasConsented() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check consent status");
    };
    
    switch (userConsents.get(caller)) {
      case (?consent) { consent.hasConsented };
      case (null) { false };
    };
  };

  public query ({ caller }) func getConsentTimestamp() : async ?Time.Time {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view consent timestamp");
    };
    
    switch (userConsents.get(caller)) {
      case (?consent) { ?consent.timestamp };
      case (null) { null };
    };
  };
};
