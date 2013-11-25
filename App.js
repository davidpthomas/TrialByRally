Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    layout: {
      type: 'vbox',
      align: 'center'
    },
    margin: '20 0 0 0',
    data: {
        companyName: '',
        lineOfBusinessName: '',
        pilotTeamName: ''
    },
    models: null,
    projectCounter: 0,
    projectCountTotal: 0,
    
    artifactCounter: 0,
    bulkUpdateCounter: 0,
    artifactCountTotal: 0,
    
    projectTreeIndex: {},

    // {{{
    projectTree: {
        name: 'RallyTrial8',
        children: [
            {
                name: 'Company',
                alias: 'company',
                children: [
                    {
                        name: 'Line of Business',
                        alias: 'business',
                        children: [
                            {
                                name: 'Pilot Team',
                                alias: 'pilot-team',
                                children: [
                                    {
                                        name: 'Company Team',
                                        alias: 'company-team'
                                    },
                                    {
                                        name: 'Rally Team',
                                        alias: 'rally-team'
                                    }]
                            }]
                    }]
            }
        ]
    },


    artifactTree: {
        type: 'PortfolioItem/Initiative',
        name: 'Successful Trial Pilot with (Line of Business Group)',
        project: 'testing',
        children: [
            {
                type: 'PortfolioItem/Feature',
                name: 'Administrative Activities',
                children: [
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Trial agreements',
                        children: [
                            { type: 'Task', name: 'NDA' },
                            { type: 'Task', name: 'Info Security' },
                            { type: 'Task', name: 'Procurement' },
                            { type: 'Task', name: 'Rally Deployment' },
                            { type: 'Task', name: 'Identify Pilot Team' }
                        ]
                    }
                ]
            },
            {
                type: 'PortfolioItem/Feature',
                name: 'Rally Training + Working Sessions',
                children: [
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Trial roadmap',
                        children: [
                            { type: 'Task', name: 'Rally and Company review and accept POV' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Rally/customer collaboration during trial',
                        children: [
                            {
                                type: 'HierarchicalRequirement',
                                name: "Understand Customer's organizational and operational environment",
                                children: [
                                    { type: 'Task', name: 'What is your Product-Team organizational structure to be managed using Agile approaches in Rally?' },
                                    { type: 'Task', name: 'What is driving your Agile and Lean Transformation?' },
                                    { type: 'Task', name: 'What is your organization hierarchy / structure?' },
                                    { type: 'Task', name: 'How do you organize your teams and / or work -- e.g. Team / Product / Feature / Component based?' },
                                    { type: 'Task', name: 'What do you report, to whom, and why?' }
                                ]
                            },
                            {
                                type: 'HierarchicalRequirement',
                                name: "Detailed Demo/Trial Kickoff Meeting",
                                children: [
                                    {
                                        type: 'HierarchicalRequirement',
                                        name: 'Setup',
                                        children: [
                                            { type: 'Task', name: 'Rally subscription configuration and setup overview' },
                                            { type: 'Task', name: 'Rally Workspace and Project Hierarchy overview' },
                                            { type: 'Task', name: 'Rally users and permissions overview' }
                                        ]
                                    },
                                    {
                                        type: 'HierarchicalRequirement',
                                        name: 'Strategy (Business Level)',
                                        children: []
                                    },
                                    {
                                        type: 'HierarchicalRequirement',
                                        name: 'Execution (Delvery Level)',
                                        children: [
                                            { type: 'Task', name: 'Support for Scrum and Kanban' }
                                        ]
                                    },
                                    {
                                        type: 'HierarchicalRequirement',
                                        name: 'Extending Rally',
                                        children: [
                                            { type: 'Task', name: 'Apps and Dashboards' },
                                            { type: 'Task', name: 'Web Services API' }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 'HierarchicalRequirement',
                                name: "Self help resources",
                                children: [
                                    {
                                        type: 'Task',
                                        name: 'Rally Online Help'
                                    },
                                    {
                                        type: 'Task',
                                        name: 'Rally Video Tutorials'
                                    },
                                    {
                                        type: 'Task',
                                        name: 'Rally Support'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                type: 'PortfolioItem/Feature',
                name: 'The TRIAL',
                children: [
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Configure organizational structure (Project Hierarchy)',
                        children: [
                            { type: 'Task', name: 'Create project structure in Rally' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Populate Team Backlog(s)',
                        children: [
                            { type: 'Task', name: '[RPM] create portfolio items' },
                            { type: 'Task', name: 'create stories' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Scrum',
                        children: [
                            { type: 'Task', name: 'Define Release and Iteration time-boxes' },
                            { type: 'Task', name: 'Plan Stories (Backlog) into Iterations' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Kanban',
                        children: [
                            { type: 'Task', name: 'Define Kanban States' },
                            { type: 'Task', name: '[RPM] Define PI level value stream' },
                            { type: 'Task', name: 'Add/configure team Kanban board(s)' },
                            { type: 'Task', name: '[RPM] Add/configure Portfolio Kanban board(s)' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Tracking',
                        children: [
                            { type: 'Task', name: 'Setup Pages (Dashboards)' },
                            { type: 'Task', name: 'Setup Apps' }
                        ]
                    }
                ]
            }
            
        ]
    },

    // }}}

    launch: function() {
      this._createLayout();
    },

    _createLayout: function() {

        var welcomeText1 = Ext.create('Ext.Component', {
            itemId: 'card-welcome',
            width: 600,
            html: "<div class='headline'>Welcome to your Rally Trial.</div><div class='content'>Organizations use Rally to accelerate the pace of innovation, improve productivity, and more effectively adapt to rapidly changing customer needs and competitive dynamics.</div>"
        });

        var welcomeTextContainer1 = Ext.create('Ext.Container', {
          items: [welcomeText1]
        });

        this.dialog = Ext.create('Rally.ui.dialog.Dialog', {
          itemId: 'dialog',
          autoShow: false,
          draggable: true,
          width: 600,
          height: 350,
          items: this._createTrialInstallWizard()
        });

        var welcomeText2 = Ext.create('Ext.Component', {
          itemId: 'card-init2',
          html: "<div class='content'>Get on the fast track to evaluating Rally!</div>"
        });

        var getStartedButton = Ext.create('Rally.ui.Button', {
          text: 'Get Started',
          handler: function() {
            this.dialog.show();
          },
          scope: this
        });

        var welcomeTextContainer2 = Ext.create('Ext.Container', {
          layout: {
            type: 'hbox',
            align: 'middle'
          },
          items: [welcomeText2, getStartedButton]
        });

        var welcomeCard = Ext.create('Ext.Container', {
          items: [welcomeTextContainer1, welcomeTextContainer2]
        });

        // TEXT
        var nextStepsText = Ext.create('Ext.Component', {
            itemId: 'card-next-steps',
            width: 600,
            html: "<div class='headline'>Almost Done...</div><div class='content'>We've just created a project structure and artifacts to help manage your trial experience.  Now lets create some dashboards to visualize the work.</div>"
        });

        // CARD 1
        var nextStepsCard1Number = Ext.create('Ext.Component', {
          html: "<div class='enlarged-number'>#1</div>"
        });

        var nextStepsCard1Image = Ext.create('Ext.Img', {
          src: "",
          width: "300px"
        });

        var nextStepsCard1ImageNumberContainer = Ext.create('Ext.Container', {
          layout: {
            type: 'hbox',
            align: 'middle'
          },
          items: [nextStepsCard1Number, nextStepsCard1Image]
        });

        var nextStepsCard1Desc = Ext.create('Ext.Component', {
          width: 300,
          html: "<div class='content'>Create a new 'Page' in Rally.</div>"
        });

        var nextStepsCard1DescContainer = Ext.create('Ext.Container', {
          layout: 'vbox',
          items: [nextStepsCard1ImageNumberContainer, nextStepsCard1Desc]
        });

        var nextStepsCard1 = Ext.create('Ext.Container', {
            itemId: 'card-next-card1',
            margin: '20 0 0 0',
            items: [nextStepsCard1DescContainer]
        });


        // CARD 2
        var nextStepsCard2Number = Ext.create('Ext.Component', {
          html: "<div class='enlarged-number'>#2</div>"
        });

        var nextStepsCard2Image = Ext.create('Ext.Img', {
        src: "",          
        width: "300px"
        });

        var nextStepsCard2ImageNumberContainer = Ext.create('Ext.Container', {
          layout: {
            type: 'hbox',
            align: 'middle'
          },
          items: [nextStepsCard2Number, nextStepsCard2Image]
        });

        var nextStepsCard2Desc = Ext.create('Ext.Component', {
          html: "<div class='content'>Add individual 'Apps' to your Page.</div>"
        });

        var nextStepsCard2DescContainer = Ext.create('Ext.Container', {
          layout: 'vbox',
          items: [nextStepsCard2ImageNumberContainer, nextStepsCard2Desc]
        });

        var nextStepsCard2 = Ext.create('Ext.Container', {
            itemId: 'card-next-card2',
            margin: '20 0 0 0',
            items: [nextStepsCard2DescContainer]
        });


        // CARD 3
        var nextStepsCard3Number = Ext.create('Ext.Component', {
          html: "<div class='enlarged-number'>#3</div>"
        });

        var nextStepsCard3Image = Ext.create('Ext.Img', {
          src: "",
          width: "300px"
        });

        var nextStepsCard3ImageNumberContainer = Ext.create('Ext.Container', {
          layout: {
            type: 'hbox',
            align: 'middle'
          },
          items: [nextStepsCard3Number, nextStepsCard3Image]
        });

        var nextStepsCard3Desc = Ext.create('Ext.Component', {
          width: 450,
          html: "<div class='content'>We recommend adding the 'Iteration Planning Board' and 'My User Stories' Apps.</div>"
        });

        var nextStepsCard3Container = Ext.create('Ext.Container', {
          layout: 'vbox',
          items: [nextStepsCard3ImageNumberContainer, nextStepsCard3Desc]
        });

        var nextStepsCard3 = Ext.create('Ext.Container', {
            itemId: 'card-next-card3',
            margin: '20 0 0 0',
            items: [nextStepsCard3Container]
        });

        var nextStepsCard = Ext.create('Ext.Container', {
          layout: {
            type: 'vbox',
            align: 'center'
          },
          items: [nextStepsText, nextStepsCard1, nextStepsCard2, nextStepsCard3]
        });

        var wizard = Ext.create('Ext.panel.Panel', {
            itemId: 'appwizard',
            layout: 'card',
            border: 0,
            defaults: {
                border: false
            },
            items: [welcomeCard, nextStepsCard]
        });


        this.add(wizard);

    },

    _createTrialInstallWizard: function() {
        var me = this;

        var cardOverview = Ext.create('Ext.Component', {
            itemId: 'card-overview',
            html: "<div class='headline'>Lets Get Started.</div><div class='content'>Agile teams increase their effectiveness by making work visible.</div><div class='content'>Lets make your trial experience impactful by using the Rally Product to guide you through the process.</div><div class='content'>We'll start by creating some Initiatives and User Stories to define our work.</div>" 
        });
        
        var cardNames = Ext.create('Ext.Container', {
            itemId: 'card-names',
            items: [
                {
                    html: "<div class='headline'>Customized Names.</div><div class='content'>To make your experience feel at home, we'd like to use relevant names in the tool setup.</div><div class='content'>Please provide an example Line of Business and pilot Team Name.</div>",
                    border: 0,
                    margin: '0 0 10 0'
                },
                {
                    xtype: 'rallytextfield',
                    itemId: 'companyName',
                    fieldLabel: 'Company Name',
                    labelAlign: 'right',
                    width: 350,
                    labelWidth: 100,
                    labelCls: 'field-label',
                    emptyText: 'Acme Inc., Widgets Unlimited, etc',
                    listeners: {
                        change: function(textfield, newValue, oldValue) {
                            this.data.companyName = newValue;
                            var nextButton = Ext.getCmp('nav-button-next');
                            var pilotTeamName = textfield.up().down('#pilotTeamName').getValue();
                            var lineOfBusinessName = textfield.up().down('#lineOfBusinessName').getValue();
                            if (newValue.length > 0 && pilotTeamName.length > 0 && lineOfBusinessName > 0) {
                                nextButton.setDisabled(false);
                            } else {
                                nextButton.setDisabled(true);
                            }
                        },
                        focus: function(textfield) {
                                textfield.setValue('');
                        },
                        scope: this
                    }
                },
                {
                    xtype: 'rallytextfield',
                    itemId: 'lineOfBusinessName',
                    fieldLabel: 'Line of Business',
                    labelAlign: 'right',
                    width: 350,
                    labelWidth: 100,
                    labelCls: 'field-label',
                    emptyText: 'Consumer Products, Home Mortgages, etc',
                    listeners: {
                        change: function(textfield, newValue, oldValue) {
                            this.data.lineOfBusinessName = newValue;
                            var nextButton = Ext.getCmp('nav-button-next');
                            var companyName = textfield.up().down('#companyName').getValue();
                            var pilotTeamName = textfield.up().down('#pilotTeamName').getValue();
                            
                            if (newValue.length > 0 && companyName.length > 0 && pilotTeamName.length > 0) {
                                nextButton.setDisabled(false);
                            } else {
                                nextButton.setDisabled(true);
                            }
                        },
                        focus: function(textfield) {
                                textfield.setValue('');
                        },
                        scope: this
                    }
                },
                {
                    xtype: 'rallytextfield',
                    itemId: 'pilotTeamName',
                    fieldLabel: 'Pilot Project',
                    labelAlign: 'right',
                    width: 350,
                    labelWidth: 100,
                    labelCls: 'field-label',
                    emptyText: 'Scrum Team #1, Red Team, Flying Aces, etc',
                    listeners: {
                        change: function(textfield, newValue, oldValue) {
                            this.data.pilotTeamName = newValue;
                            var nextButton = Ext.getCmp('nav-button-next');
                            var companyName = textfield.up().down('#companyName').getValue();
                            var lineOfBusinessName = textfield.up().down('#lineOfBusinessName').getValue();
                            if (newValue.length > 0 && companyName.length > 0 && lineOfBusinessName.length > 0) {
                                nextButton.setDisabled(false);
                            } else {
                                nextButton.setDisabled(true);
                            }
                        },
                        scope: this
                    }
                }
            ]
        });
        
        var cardConfirmation = Ext.create('Ext.Component', {
            itemId: 'card-confirmation',
            data: null,
            tpl: new Ext.XTemplate(
                "<div class='headline'>Confirmation.</div>",
                "<div class='content'>We're prepared to setup your Trial.  Feel free to go back and make any changes.</div>",
                "<div class='content'>&nbsp;&nbsp;&nbsp;&nbsp;<b>Company:</b> {companyName}</div>",
                "<div class='content'>&nbsp;&nbsp;&nbsp;&nbsp;<b>Line of Business:</b> {lineOfBusinessName}</div>",
                "<div class='content'>&nbsp;&nbsp;&nbsp;&nbsp;<b>Pilot Project:</b> {pilotTeamName}</div>",
                "<div class='content'>Click 'Setup Trial' to begin your Trial!</div>"
                )
        });
        
        var cardStatus = Ext.create('Ext.Component', {
            itemId: 'card-status',
            html: ''   // we have a loadmask
        });
    
        var cardFinish = Ext.create('Ext.Component', {
            itemId: 'card-final',
            html: ""  // intentionally left empty
        });
        
        var wizard = Ext.create('Ext.panel.Panel', {
            itemId: 'installwizard',
            layout: 'card',
            height: 327,
            defaults: {
                border: false
            },
            bbar: [
                {
                    id: 'nav-button-back',
                    text: 'Back',
                    handler: function(btn) {
                        this._navigate(btn.up('panel'), 'prev');
                    },
                    scope: me,
                    hidden: true
                },
                '->',
                {
                    id: 'nav-button-next',
                    text: 'Next',
                    handler: function(btn) {
                        this._navigate(btn.up('panel'), 'next');
                    },
                    scope: me,
                    disabled: false
                }
            ],
            items: [cardOverview, cardNames, cardConfirmation, cardStatus, cardFinish]
        });

        return wizard;
    },

    _navigate: function(panel, direction) {
        var me = this;
        
        var layout = panel.getLayout();
        layout[direction]();    // change to next card (prev or next)
        
        var backButton = Ext.getCmp('nav-button-back');
        var nextButton = Ext.getCmp('nav-button-next');
    
        var cardId = layout.getActiveItem().getItemId();
        
        nextButton.setText('Next');

                    // require project selection
        if (cardId === 'card-overview') {
            backButton.show();
        }
        
        // require business and project names
        if (cardId === 'card-names' && (me.data.lineOfBusinessName.length === 0 || me.data.pilotTeamName.length === 0 )) {
            nextButton.setDisabled(true);
        } else {
            nextButton.setDisabled(false);
        }
        
        // populate confirmation card with given data    
        if (cardId === 'card-confirmation') {
            Ext.ComponentQuery.query('#card-confirmation')[0].update(me.data);
            nextButton.setText('Setup Trial');
        }
        if (cardId === 'card-status') {
            backButton.hide();
            nextButton.hide();
            me.loadMask = new Ext.LoadMask(layout.getActiveItem(), {msg: "Creating Trial..."});    
            me.loadMask.show();

            me._createTrial();
        }
        if (cardId === 'card-final') {
            var dialog = Ext.ComponentQuery.query('#dialog')[0];
            dialog.destroy();
            var appwizard = Ext.ComponentQuery.query('#appwizard')[0];
            var layout = appwizard.getLayout();
            layout['next']();
        }
        
    },
    
    _countTreeChildren:function(tree, countRef) {
        if (tree.name) {
            countRef.counter++;
            if (tree.children)  {
                Ext.Array.each(tree.children, function(child) {
                    this._countTreeChildren(child, countRef);
                    }, this);
            }
        }
    },


    _createProjects: function() {
        var me = this;
        // replace with Customer provided data
        me.projectTree.children[0].name = me.data.companyName;
        me.projectTree.children[0].children[0].name = me.data.lineOfBusinessName;
        me.projectTree.children[0].children[0].children[0].children[0].name = me.data.pilotTeamName;
        
        me._createProjectTree(me.getContext().getWorkspaceRef(), me.data.selectedParentProject, me.projectTree.name, me.projectTree.alias, me.projectTree.children);
    },    
    
    _createProjectTree: function(workspaceRef, parentProjectRef, projectName, projectAlias, children) {
        var me = this;
        var record = Ext.create(this.models['Project'], {
            Name: projectName,
            State: 'Open',
            Parent: parentProjectRef,
            Workspace: workspaceRef
        });
        record.save({
           callback: function(result, operation) {
               //TODO handle fail?
               me.projectCounter++;
               var currParentProjectRef = result.get('_ref');
               // create flat index of alias to project ref for easy lookup during artifact loading
               me.projectTreeIndex[projectAlias] = currParentProjectRef;
               
               Ext.Array.each(children, function(child) {
                   me._createProjectTree(workspaceRef, currParentProjectRef, child.name, child.alias, child.children);
               });
               me._onProjectCreated();
           } 
        });
    },

    _createArtifacts: function() {
        var me = this;
        me._createArtifactTree(me.getContext().getWorkspaceRef(), me.projectTreeIndex[me.artifactTree.project], null, me.artifactTree.type, me.artifactTree.name, me.artifactTree.children);
    },
    
    _createArtifactTree: function(workspaceRef, projectRef, parentRef, artifactType, artifactName, artifactChildren) {
        var deferred;
        deferred = Ext.create('Deft.Deferred');

        var me = this;
        
        var record = Ext.create(this.models[artifactType], {
                Workspace: workspaceRef,
                Project: projectRef,
                Name: artifactName
        });

    
        record.save({
           callback: function(result, operation) {

                console.log(result, result.get('ObjectID'));

                var childArray = [];
                var currRef = result.get('_ref');
                var bulkPromise;
               //TODO handle fail?
               me.artifactCounter++;

               if (artifactChildren === undefined || artifactChildren.length == 0) {
                    deferred.resolve(result);
               }
               else{ 
                   Ext.Array.each(artifactChildren, function(child) {
                       childArray.push(me._createArtifactTree(workspaceRef, me.projectTreeIndex[child.project], currRef, child.type, child.name, child.children));
                   });



                   Deft.Promise.all(childArray).then({
                        success: function(childrenRecords) {
                           me.bulkUpdateCounter++;

                           if (artifactChildren[0].type.match(/Portfolio/)) {
                                bulkPromise = this._bulkUpdate('Parent', currRef, childrenRecords);
                           }
                           else if (artifactChildren[0].type === 'HierarchicalRequirement' && currRef.match(/portfolio/)) {
                                bulkPromise = this._bulkUpdate('PortfolioItem', currRef, childrenRecords);
                           }
                           else if (artifactChildren[0].type === 'HierarchicalRequirement' && currRef.match(/hierarchical/)) {
                                bulkPromise = this._bulkUpdate('Parent', currRef, childrenRecords);
                           }
                           else if (artifactChildren[0].type === 'Task') {
                                bulkPromise = this._bulkUpdate('WorkProduct', currRef, childrenRecords);
                           }
                           else {
                                console.error("Unexpected artifact type during artifact creation", artifactType);
                           }
                           bulkPromise.then({
                                success: function(readOnlyRecords) {
                                    // var store = Ext.create('Rally.data.WsapiDataStore', {
                                    //     model: artifactType,
                                    //     autoLoad: true,
                                    //     filters: [
                                    //         {
                                    //             property: '_ref',
                                    //             value: currRef
                                    //         }
                                    //     ],
                                    //     listeners: {
                                    //         load: function(store, record, success) {
                                    //             deferred.resolve(record);
                                    //         },
                                    //         scope: this
                                    //     },
                                    //     fetch: true
                                    // });
                                    deferred.resolve(result);
                                    this.bulkUpdateCounter--;
                                    if (this.bulkUpdateCounter == 0) {
                                        this._onArtifactCreated();
                                    }
                                },
                                failure: function(err){
                                    console.error("There was an error: ", err);
                                },
                                scope: this
                           });
                        },
                        failure: function(err) {
                            console.error("There was an error: ", err);
                        },
                        scope: this
                   });
               }
            },
            scope: this
        });
        return deferred.promise;
    },

    _bulkUpdate: function(parentField, parentRef, childrenRecords) {
        var deferred;
        deferred = Ext.create('Deft.Deferred');

        var obj = {};
        obj[parentField] = parentRef;
        Rally.data.BulkRecordUpdater.updateRecords({
            records: childrenRecords,
            propertiesToUpdate: obj,
            success: function(readOnlyRecords){
                console.log("bulk update success");
                deferred.resolve(readOnlyRecords);
            },
            failure: function(err) {
                console.error("Bulk update Error: ", + err);
            },
            scope: this
        });

        return deferred.promise;
    },
    
    _onArtifactCreated: function() {
        var me = this;
        if (this.artifactCounter === this.artifactCountTotal) {
            console.log("All Artifacts Created!");
            me.loadMask.hide();

            var installWizard = Ext.ComponentQuery.query('#installwizard')[0];
            this._navigate(installWizard, 'next');
        }
    },
    
    _onProjectCreated: function() {
        //console.log('projectTree', this.projectTree);
        //console.log('projectTreeIndex', this.projectTreeIndex);
        if (this.projectCounter === this.projectCountTotal) {
            console.log("All Projects Created!");
            this._createArtifacts();
        }
    },
    
    _loadModels: function() {
        Rally.data.ModelFactory.getModels({
            types: ['Project', 'PortfolioItem/Feature', 'PortfolioItem/Initiative', 'HierarchicalRequirement', 'Task'],
            context: this.getContext().getDataContext(),
            scope: this,
            success: function(models) {
                this.models = models;
                this._createProjects();
            }
        });
    },
    
    _createTrial: function() {
        var me = this;
    
        var counterRef = {counter: 0};
        me._countTreeChildren(me.projectTree, counterRef);
        me.projectCountTotal = counterRef.counter;
        console.log("Will create %i projects.", me.projectCountTotal);
        counterRef = {counter: 0};
        me._countTreeChildren(me.artifactTree, counterRef);
        me.artifactCountTotal = counterRef.counter;
        console.log("Will create %i artifacts.", me.artifactCountTotal);
        
        // create project structure
        me._loadModels();
        // create artifacts
    }
});