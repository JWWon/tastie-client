//
//  TastieUITests.swift
//  TastieUITests
//
//  Created by Jiwoon Won on 2020/03/16.
//  Copyright © 2020 Facebook. All rights reserved.
//

import XCTest

class TastieUITests: XCTestCase {

  override func setUp() {
    // Put setup code here. This method is called before the invocation of each test method in the class.
    let app = XCUIApplication()
    setupSnapshot(app)
    app.launch()

    // In UI tests it is usually best to stop immediately when a failure occurs.
    continueAfterFailure = false

    // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    XCUIApplication().launch()
  }

  override func tearDown() {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
  }

  func testExample() {
    // Use recording to get started writing UI tests.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
    snapshot("1_Case")
  }

  func testLaunchPerformance() {
    if #available(macOS 10.15, iOS 13.0, tvOS 13.0, *) {
      // This measures how long it takes to launch your application.
      measure(metrics: [XCTOSSignpostMetric.applicationLaunch]) {
        XCUIApplication().launch()
      }
    }
  }
}
