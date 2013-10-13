Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    data: {
        lineOfBusinessName: null,
        pilotProjectName: null,
        selectedParentProject: null,
    },
    projectModel: null,
    projectTree: {
        name: 'RallyTrial',
        children: [
            {
                name: 'Company',
                children: [
                    {
                        name: 'Line of Business',
                        children: [
                            {
                                name: 'Pilot Team',
                                children: [
                                    {
                                        name: 'Company Team'
                                    },
                                    {
                                        name: 'Rally Team'
                                    }]
                            }]
                    }]
            }
        ]
    },
    
    launch: function() {
        var me = this;    
        /*
Ext.create('Rally.data.WsapiDataStore', {
    model: 'Workspace',
    autoLoad: true,
    fetch: true,
    context: {
        workspace: '',
        project: ''
    },
    listeners: {
        load: function(store, data) {
            console.log("ws", data);
        }
    }
});
*/
        var navigate = function(panel, direction) {
            console.log('data', me.data);
            var layout = panel.getLayout();
            

            layout[direction]();
            
            var backButton = Ext.getCmp('move-prev');
            var nextButton = Ext.getCmp('move-next');
            
            backButton.setDisabled(!layout.getPrev());
            nextButton.setDisabled(!layout.getNext());
            
            if (!layout.getPrev()) {
                nextButton.setText('Start');
            } else {
                nextButton.setText('Next');
            }    
            // require project selection
            if (layout.getActiveItem().getItemId() === 'card-3') {
                nextButton.setDisabled(true);
            }
            
            // require business and project names
            if (layout.getActiveItem().getItemId() === 'card-4') {
                nextButton.setDisabled(true);
            }
            // populate confirmation card with given data    
            if (layout.getActiveItem().getItemId() === 'card-5') {
                me.down('#card-5').update(me.data);
            }
            if (layout.getActiveItem().getItemId() === 'card-6') {
                backButton.hide();
                nextButton.hide();
            
                // TODO loadmask    
                me._loadProjectModel();
            }
            
        };
        
        var card1 = Ext.create('Ext.Component', {
            itemId: 'card-1',
            html: "Welcome to Rally.<br/><br/>Let's start your Trial!"
        });
        
        
        var card2 = Ext.create('Ext.Component', {
            itemId: 'card-2',
            html: "Lets take this journey together by setting up a Trial Initiative and track our progress with some Stories!" 
        });
        
        
        var card3 = Ext.create('Ext.Container', {
            itemId: 'card-3',
            items: [
                {
                    html: 'We will be creating a small project structure to store our initiatives, stories, etc.<br><br>  Pick an existing project to be the parent of our new structure.',
                    margin: '0 0 15 0',
                    border: 0
                },
                {
                    xtype: 'rallyprojectpicker',
                    fieldLabel: 'Project',
                    showMostRecentlyUsedProjects: false,
                    showProjectScopeUpAndDown: false,
                    workspace: this.getContext().getWorkspaceRef(),
                    listeners: {
                        change: function(picker) {
                            this.data.selectedParentProject = picker.getValue();
                            var nextButton = Ext.getCmp('move-next');
                            nextButton.setDisabled(false);
                        },
                        scope: this
                    }
                }
            ]
        });
        
        var card4 = Ext.create('Ext.Container', {
            itemId: 'card-4',
            items: [
                {
                    html: 'We need a few names to customize the project structure.',
                    border: 0,
                    margin: '0 0 10 0'
                },
                {
                    xtype: 'rallytextfield',
                    itemId: 'lineOfBusinessName',
                    fieldLabel: 'Line of Business',
                    labelAlign: 'right',
                    labelWidth: 100,
                    labelCls: 'field-label',
                    listeners: {
                        change: function(textfield, newValue, oldValue) {
                            this.data.lineOfBusinessName = newValue;
                            var nextButton = Ext.getCmp('move-next');
                            var pilotProjectName = this.down('#pilotProjectName').getValue();
                            
                            if (newValue.length > 0 && pilotProjectName.length > 0) {
                                nextButton.setDisabled(false);
                            } else {
                                nextButton.setDisabled(true);
                            }
                        },
                        scope: this
                    }
                },
                {
                    html: 'e.g. Consumer Products, Home Mortgages, etc',
                    border: 0,
                    margin: '0 0 15 0',
                    cls: 'field-example'
                },
                {
                    xtype: 'rallytextfield',
                    itemId: 'pilotProjectName',
                    fieldLabel: 'Pilot Project',
                    labelAlign: 'right',
                    labelWidth: 100,
                    labelCls: 'field-label',
                    listeners: {
                        change: function(textfield, newValue, oldValue) {
                            
                            this.data.pilotProjectName = newValue;
                            var nextButton = Ext.getCmp('move-next');
                            var lineOfBusinessName = this.down('#lineOfBusinessName').getValue();
                            if (newValue.length > 0 && lineOfBusinessName.length > 0) {
                                nextButton.setDisabled(false);
                            } else {
                                nextButton.setDisabled(true);
                            }
                        },
                        scope: this
                    }
                },
                {
                    html: 'e.g. Scrum Team #1, Red Team, etc',
                    border: 0,
                    cls: 'field-example'
                },
            ]
        });
        
        var card5 = Ext.create('Ext.Component', {
            itemId: 'card-5',
            data: null,
            tpl: new Ext.XTemplate(
                'Line of Business: {lineOfBusinessName}',
                'Pilot Project: {pilotProjectName}'
                )
        });
        
        var card6 = Ext.create('Ext.Component', {
            itemId: 'card-6',
            html: 'We are building your Trial!'
        });
    
        var card7 = Ext.create('Ext.Component', {
            itemId: 'card-6',
            html: 'Congratulations!'
        });
        
        var wizard = Ext.create('Ext.panel.Panel', {
            title: 'TrialByRally',
            width: 400,
            height: 300,
            layout: 'card',
            bodyStyle: 'padding: 15px',
            defaults: {
                border: false
            },
            bbar: [
                {
                    id: 'move-prev',
                    text: 'Back',
                    handler: function(btn) {
                        navigate(btn.up('panel'), 'prev');
                    },
                    disabled: true
                },
                '->',
                {
                    id: 'move-next',
                    text: 'Start',
                    handler: function(btn) {
                        navigate(btn.up('panel'), 'next');
                    },
                    disabled: false
                }
            ],
            items: [
                card1, card2, card3, card4, card5, card6
            ]
        });
        this.add(wizard);
    },

    _createProjects: function(l) {

        var workspaceRef = '/workspace/699220';   // TODO get this from User
        this._createProjectTree(workspaceRef, null, this.projectTree.name, this.projectTree.children)
    },    
    
    _createProjectTree: function(workspaceRef, parentProjectRef, projectName, children) {
        var me = this;
        console.log('creating project', workspaceRef, parentProjectRef, projectName, children);
        var record = Ext.create(this.projectModel, {
            Name: projectName,
            State: 'Open',
            Parent: parentProjectRef,
            Workspace: workspaceRef
        });
        console.log('record', record);
        record.save({
           callback: function(result, operation) {
               console.log('save result', result, operation);
               console.log(result.get('ObjectID'), result.get('Name'));
               var currParentProjectId = result.get('ObjectID');
               Ext.Array.each(children, function(child) {
                   console.log("child", child.name, child.children);
                   me._createProjectTree(workspaceRef, currParentProjectId, child.name, child.children);
               })
           } 
        });
    },
    
    _loadProjectModel: function() {
        Rally.data.ModelFactory.getModel({
            type: 'Project',
            context: this.getContext().getDataContext(),
            scope: this,
            success: function(model) {
                this.projectModel = model;
                this._createProjects();
            }
        }, this);
    }
});
